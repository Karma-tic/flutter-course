import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { StudyPlannerModal } from './components/StudyPlannerModal';

import { HomePage } from './pages/HomePage';
import { RoadmapPage } from './pages/RoadmapPage';
import { CoursePage, LessonView } from './pages/LessonView';
import { ExamPrepPage } from './pages/ExamPrepPage';
import { PracticeLabPage } from './pages/PracticeLabPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { CheatSheetsPage } from './pages/CheatSheetsPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  return (
    <ThemeProvider>
      <ProgressProvider>
        <HashRouter>
          <div className="flex min-h-screen flex-col bg-white text-neutral-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-neutral-100">
            {/* Global Navigation */}
            <Navbar
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenPlanner={() => setIsPlannerOpen(true)}
            />

            {/* Main Page Routes */}
            <div className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={<HomePage onOpenPlanner={() => setIsPlannerOpen(true)} />}
                />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/course" element={<CoursePage />} />
                <Route path="/course/:lessonId" element={<LessonView />} />
                <Route path="/exam-prep" element={<ExamPrepPage />} />
                <Route path="/practice" element={<PracticeLabPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/certifications" element={<CertificationsPage />} />
                <Route path="/cheat-sheets" element={<CheatSheetsPage />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            {/* Global Modals */}
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
            <StudyPlannerModal
              isOpen={isPlannerOpen}
              onClose={() => setIsPlannerOpen(false)}
            />

            {/* Global Footer */}
            <Footer />
          </div>
        </HashRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default App;

