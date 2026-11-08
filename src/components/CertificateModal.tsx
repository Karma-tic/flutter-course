import React, { useState, useRef, useEffect } from 'react';
import { Award, Printer, Download, X, ShieldAlert } from 'lucide-react';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';

export interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLearnerName?: string;
  onSaveName?: (name: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  defaultLearnerName = '',
  onSaveName,
}) => {
  const [name, setName] = useState(defaultLearnerName || 'Learner Name');
  const certRef = useRef<HTMLDivElement>(null);

  // Trigger celebration confetti when opened
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  const certId = `KX-FLUTTER-${Math.abs(
    name.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  ).toString(16).toUpperCase().padStart(8, '0')}`;

  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Background border - Flutter Sky Blue
    doc.setDrawColor(2, 132, 199); // #0284C7 Sky-600
    doc.setLineWidth(4);
    doc.rect(25, 25, pageWidth - 50, pageHeight - 50);

    doc.setDrawColor(226, 232, 240); // Slate-200 inner border
    doc.setLineWidth(1.5);
    doc.rect(32, 32, pageWidth - 64, pageHeight - 64);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text('KARMATIX FLUTTER ACADEMY', pageWidth / 2, 95, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(2, 132, 199); // Sky-600
    doc.text('Certificate of Completion', pageWidth / 2, 125, { align: 'center' });

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(13);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text('This is proudly presented to', pageWidth / 2, 175, { align: 'center' });

    // Recipient Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(15, 23, 42);
    doc.text(name, pageWidth / 2, 220, { align: 'center' });

    doc.setDrawColor(2, 132, 199);
    doc.setLineWidth(2);
    doc.line(pageWidth / 2 - 180, 232, pageWidth / 2 + 180, 232);

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105);
    doc.text(
      'for successfully mastering production-grade Flutter & Dart cross-platform mobile engineering,',
      pageWidth / 2,
      270,
      { align: 'center' }
    );
    doc.text(
      'completing all 11 core modules (0 to 10), state management, animations, testing, and capstone apps.',
      pageWidth / 2,
      290,
      { align: 'center' }
    );

    // Metadata
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Issued Date: ${completionDate}`, 80, 420);
    doc.text(`Credential ID: ${certId}`, 80, 440);
    doc.text('Issued by: Karmatix (https://karmatix.in)', 80, 460);

    doc.text('Authorized Signature', pageWidth - 190, 420);
    doc.setFont('helvetica', 'bold');
    doc.text('Karmatix Education Board', pageWidth - 190, 440);

    // Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      '* Certificate of completion (not an accredited qualification). Generated client-side for curriculum accomplishment.',
      pageWidth / 2,
      pageHeight - 45,
      { align: 'center' }
    );

    doc.save(`Karmatix_Flutter_Certificate_${certId}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Course Completion Certificate
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generated entirely in your browser upon course completion.
            </p>
          </div>
        </div>

        {/* Name input */}
        <div className="mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Learner Full Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (onSaveName) onSaveName(e.target.value);
            }}
            placeholder="Enter your full name"
            className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Certificate Preview Card */}
        <div
          ref={certRef}
          className="print-page border-4 border-sky-600 dark:border-sky-500 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-white via-sky-50/20 to-slate-50 dark:from-slate-900 dark:via-sky-950/20 dark:to-slate-950 text-center relative shadow-inner overflow-hidden"
        >
          {/* Subtle watermark seal */}
          <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none">
            <img src={`${import.meta.env.BASE_URL}brand/logo.svg`} alt="" className="w-48 h-48" />
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-widest">
              Karmatix Educational Platform
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Certificate of Completion
            </h1>

            <p className="text-sm italic text-slate-500 dark:text-slate-400">
              This certificate verifies that
            </p>

            <div className="py-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400 border-b-2 border-sky-200 dark:border-sky-800 inline-block pb-1 px-8">
                {name || 'Your Full Name'}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              has successfully completed all modules of the <strong>Karmatix Flutter Academy</strong> curriculum, demonstrating proficiency in <strong>Dart 3, Flutter, Riverpod, BLoC, Responsive Layouts, Impeller, SQLite, Clean Architecture, and Software Engineering Best Practices</strong>.
            </p>

            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 mt-6">
              <div className="text-left space-y-1">
                <p><strong>Issued On:</strong> {completionDate}</p>
                <p><strong>Credential ID:</strong> <span className="font-mono">{certId}</span></p>
                <p><strong>Issuer:</strong> Karmatix (<a href="https://karmatix.in" className="underline">karmatix.in</a>)</p>
              </div>
              <div className="text-right sm:self-end">
                <p className="font-serif italic text-base text-slate-800 dark:text-slate-200 font-bold">Karmatix Academy</p>
                <p className="text-[11px] text-slate-400">Academic Review Board</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Warning */}
        <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            <strong>Official Notice:</strong> This is a certificate of educational completion (not an accredited college degree or formal licensing qualification). As this site operates statically with zero server tracking, this certificate is generated client-side and cannot be independently verified online.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 no-print">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4 mr-1.5" />
            Print Certificate
          </button>
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 mr-1.5" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
