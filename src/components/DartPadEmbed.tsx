import React, { useState } from 'react';
import { ExternalLink, Play, Code2, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DartPadEmbedProps {
  initialCode?: string;
  type?: 'dart' | 'flutter';
  title?: string;
}

export const DartPadEmbed: React.FC<DartPadEmbedProps> = ({
  initialCode,
  type = 'flutter',
  title = 'Interactive DartPad Sandbox',
}) => {
  const { theme } = useTheme();
  const [showEmbed, setShowEmbed] = useState<boolean>(false);

  const dartPadTheme = theme === 'dark' ? 'dark' : 'light';
  const embedBase =
    type === 'flutter'
      ? 'https://dartpad.dev/embed-flutter.html'
      : 'https://dartpad.dev/embed-dart.html';

  const embedUrl = `${embedBase}?theme=${dartPadTheme}&split=55&run=true`;

  const openExternalDartPad = () => {
    window.open('https://dartpad.dev/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-flutter-500/10 text-flutter-600 dark:text-flutter-400">
            <Play className="h-3.5 w-3.5 fill-current" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Live in-browser {type === 'flutter' ? 'Flutter' : 'Dart'} execution via official DartPad
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEmbed(!showEmbed)}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {showEmbed ? (
              <>
                <EyeOff className="h-3.5 w-3.5" />
                <span>Hide Sandbox</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span>Launch DartPad</span>
              </>
            )}
          </button>

          <button
            onClick={openExternalDartPad}
            aria-label="Open DartPad in full screen"
            className="flex items-center gap-1.5 rounded-lg bg-flutter-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-flutter-700"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Open DartPad.dev</span>
          </button>
        </div>
      </div>

      {/* Body */}
      {showEmbed ? (
        <div className="relative h-[480px] w-full bg-neutral-950">
          <iframe
            title={title}
            src={embedUrl}
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-flutter-50 text-flutter-600 dark:bg-flutter-950/40 dark:text-flutter-400 mb-3">
            <Code2 className="h-6 w-6" />
          </div>
          <h5 className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
            Interactive DartPad is ready
          </h5>
          <p className="mx-auto mt-1 max-w-md text-xs text-neutral-500 dark:text-neutral-400">
            Click &ldquo;Launch DartPad&rdquo; above to run and edit code in real-time right here inside this page, or open dartpad.dev in a new tab.
          </p>
          {initialCode && (
            <div className="mt-4">
              <span className="inline-block text-xs font-medium text-neutral-400 dark:text-neutral-500">
                You can copy the code snippet above and paste it directly into DartPad!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

