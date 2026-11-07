import React, { useState } from 'react';
import { ExternalLink, Lightbulb, X } from 'lucide-react';
import { JargonTerm } from '../data/jargonBusterData';
import { CodeBlock } from './CodeBlock';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content,
  className = '',
}) => {
  const [activeJargon, setActiveJargon] = useState<JargonTerm | null>(null);

  if (!content) return null;

  // Helper to parse inline markdown: **bold**, `code`, [label](url)
  const parseInline = (text: string): React.ReactNode[] => {
    const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index;

      // Add plain text before match
      if (matchIndex > lastIndex) {
        elements.push(text.substring(lastIndex, matchIndex));
      }

      if (match[1].startsWith('[')) {
        // [Link](url)
        const linkText = match[2];
        const linkUrl = match[3];
        const isExternal = linkUrl.startsWith('http');
        elements.push(
          <a
            key={`link-${matchIndex}`}
            href={linkUrl}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-0.5 font-semibold text-flutter-600 dark:text-flutter-400 hover:text-flutter-700 dark:hover:text-flutter-300 underline underline-offset-2 transition-colors"
          >
            <span>{linkText}</span>
            {isExternal && <ExternalLink className="h-3 w-3 inline shrink-0 ml-0.5 opacity-80" />}
          </a>
        );
      } else if (match[1].startsWith('**')) {
        // **Bold**
        const boldText = match[4];
        elements.push(
          <strong
            key={`bold-${matchIndex}`}
            className="font-bold text-neutral-900 dark:text-neutral-100"
          >
            {boldText}
          </strong>
        );
      } else if (match[1].startsWith('`')) {
        // `Code`
        const codeText = match[5];
        elements.push(
          <code
            key={`code-${matchIndex}`}
            className="rounded-md border border-neutral-200/80 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-flutter-700 dark:border-neutral-700/60 dark:bg-neutral-800 dark:text-flutter-300"
          >
            {codeText}
          </code>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  // Split content into code blocks vs text blocks
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const sections: { type: 'code' | 'text'; content: string; language?: string }[] = [];
  let lastIdx = 0;
  let codeMatch: RegExpExecArray | null;

  while ((codeMatch = codeBlockRegex.exec(content)) !== null) {
    if (codeMatch.index > lastIdx) {
      sections.push({
        type: 'text',
        content: content.substring(lastIdx, codeMatch.index),
      });
    }
    sections.push({
      type: 'code',
      language: codeMatch[1] || 'dart',
      content: codeMatch[2],
    });
    lastIdx = codeBlockRegex.lastIndex;
  }

  if (lastIdx < content.length) {
    sections.push({
      type: 'text',
      content: content.substring(lastIdx),
    });
  }

  return (
    <div className={`space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 ${className}`}>
      {sections.map((section, sIdx) => {
        if (section.type === 'code') {
          return (
            <CodeBlock
              key={`code-block-${sIdx}`}
              code={section.content}
              language={section.language || 'dart'}
              title={`${section.language ? section.language.toUpperCase() : 'CODE'} SNIPPET`}
            />
          );
        }

        // Parse text section by paragraphs
        const paragraphs = section.content.split(/\n\s*\n/);

        return (
          <React.Fragment key={`text-section-${sIdx}`}>
            {paragraphs.map((p, pIdx) => {
              const trimmed = p.trim();
              if (!trimmed) return null;

              // Check for horizontal divider
              if (trimmed === '---') {
                return (
                  <hr
                    key={`hr-${pIdx}`}
                    className="my-5 border-neutral-200 dark:border-neutral-800"
                  />
                );
              }

              // Check for markdown headings
              if (trimmed.startsWith('### ')) {
                return (
                  <h4
                    key={`h4-${pIdx}`}
                    className="text-base font-bold text-neutral-900 dark:text-neutral-100 pt-3 pb-1"
                  >
                    {parseInline(trimmed.replace(/^###\s+/, ''))}
                  </h4>
                );
              }

              if (trimmed.startsWith('## ')) {
                return (
                  <h3
                    key={`h3-${pIdx}`}
                    className="text-lg font-bold text-neutral-900 dark:text-neutral-100 pt-4 pb-1"
                  >
                    {parseInline(trimmed.replace(/^##\s+/, ''))}
                  </h3>
                );
              }

              const lines = trimmed.split('\n');

              // Check if paragraph is an unordered bullet list
              const isBulletList = lines.every((line) => {
                const lt = line.trim();
                return lt.startsWith('- ') || lt.startsWith('* ') || lt === '';
              });
              if (isBulletList) {
                return (
                  <ul key={`ul-${pIdx}`} className="space-y-2 pl-2">
                    {lines
                      .filter((line) => line.trim())
                      .map((line, lIdx) => {
                        const cleaned = line.trim().replace(/^[-*]\s+/, '');
                        return (
                          <li key={lIdx} className="flex items-start gap-2.5">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flutter-500" />
                            <span className="flex-1 leading-relaxed">{parseInline(cleaned)}</span>
                          </li>
                        );
                      })}
                  </ul>
                );
              }

              // Check if paragraph is an ordered numbered list
              const isNumberedList = lines.every((line) => {
                const lt = line.trim();
                return /^\d+\.\s+/.test(lt) || lt === '';
              });
              if (isNumberedList) {
                return (
                  <ol key={`ol-${pIdx}`} className="space-y-2.5 pl-1">
                    {lines
                      .filter((line) => line.trim())
                      .map((line, lIdx) => {
                        const match = line.trim().match(/^(\d+)\.\s+(.*)$/);
                        const num = match ? match[1] : `${lIdx + 1}`;
                        const textAfter = match ? match[2] : line;
                        return (
                          <li key={lIdx} className="flex items-start gap-3">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-flutter-50 text-[11px] font-bold text-flutter-700 dark:bg-flutter-950/80 dark:text-flutter-300 border border-flutter-200/60 dark:border-flutter-800/60 mt-0.5">
                              {num}
                            </span>
                            <span className="flex-1 leading-relaxed">{parseInline(textAfter)}</span>
                          </li>
                        );
                      })}
                  </ol>
                );
              }

              // Standard paragraph
              return (
                <p key={`p-${pIdx}`} className="leading-relaxed">
                  {lines.map((line, lIdx) => (
                    <React.Fragment key={lIdx}>
                      {lIdx > 0 && <br />}
                      {parseInline(line)}
                    </React.Fragment>
                  ))}
                </p>
              );
            })}
          </React.Fragment>
        );
      })}

      {/* Jargon Buster Popup Modal */}
      {activeJargon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
            onClick={() => setActiveJargon(null)}
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {activeJargon.term}
                  </h4>
                  <span className="text-[10px] font-semibold uppercase text-amber-600 dark:text-amber-400">
                    Jargon Buster Definition
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveJargon(null)}
                className="rounded-lg p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="rounded-xl bg-neutral-50 p-3 text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  Plain English Meaning:{' '}
                </span>
                {activeJargon.simpleMeaning}
              </div>

              <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3 text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200 italic">
                <span className="font-bold not-italic text-amber-900 dark:text-amber-300">
                  💡 Real-World Analogy:{' '}
                </span>
                &ldquo;{activeJargon.funAnalogy}&rdquo;
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveJargon(null)}
                className="rounded-xl bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Got It! 👍
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
