import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  AlertCircle,
  X,
  RotateCcw,
  Sparkles,
  Smartphone,
} from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  createdAt: string;
}

export const CrudPhoneSimulator: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 'task-1',
      title: 'Install Flutter SDK & Android Studio',
      description: 'Set up development environment with flutter doctor check',
      priority: 'high',
      isCompleted: true,
      createdAt: '2 days ago',
    },
    {
      id: 'task-2',
      title: 'Complete CRUD Application Lab',
      description: 'Build complete Create, Read, Update, Delete architecture',
      priority: 'high',
      isCompleted: false,
      createdAt: 'Just now',
    },
    {
      id: 'task-3',
      title: 'Prepare for Company Flutter Exam',
      description: 'Review Activity lifecycle and Android theory comparisons',
      priority: 'medium',
      isCompleted: false,
      createdAt: '1 hour ago',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);

  const completedCount = tasks.filter((t) => t.isCompleted).length;

  const showToast = (msg: string) => {
    setSnackBarMessage(msg);
    setTimeout(() => {
      setSnackBarMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const handleDelete = (id: string) => {
    const deleted = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (deleted) {
      showToast(`Deleted "${deleted.title}"`);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setValidationError('Title is required');
      return;
    }
    if (newTitle.trim().length < 3) {
      setValidationError('Must be at least 3 characters');
      return;
    }

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim(),
      priority: newPriority,
      isCompleted: false,
      createdAt: 'Just now',
    };

    setTasks((prev) => [newTask, ...prev]);
    setIsDialogOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewPriority('medium');
    setValidationError(null);
    showToast('Task created successfully! 🎉');
  };

  const handleResetSample = () => {
    setTasks([
      {
        id: 'task-1',
        title: 'Install Flutter SDK & Android Studio',
        description: 'Set up development environment with flutter doctor check',
        priority: 'high',
        isCompleted: true,
        createdAt: '2 days ago',
      },
      {
        id: 'task-2',
        title: 'Complete CRUD Application Lab',
        description: 'Build complete Create, Read, Update, Delete architecture',
        priority: 'high',
        isCompleted: false,
        createdAt: 'Just now',
      },
      {
        id: 'task-3',
        title: 'Prepare for Company Flutter Exam',
        description: 'Review Activity lifecycle and Android theory comparisons',
        priority: 'medium',
        isCompleted: false,
        createdAt: '1 hour ago',
      },
    ]);
    showToast('Reset to starter tasks');
  };

  const getPriorityColor = (p: 'low' | 'medium' | 'high') => {
    switch (p) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'low':
        return 'bg-emerald-500 text-white';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full bg-[#070b14] select-none">
      {/* Device Header Controls */}
      <div className="flex items-center justify-between w-full max-w-[340px] mb-3 text-xs text-neutral-400">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-sky-400">
          <Smartphone className="h-3.5 w-3.5" />
          <span>Flutter Emulator (Pixel 8)</span>
        </span>
        <button
          onClick={handleResetSample}
          className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition"
          title="Reset sample data"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset App</span>
        </button>
      </div>

      {/* Phone Frame */}
      <div className="relative w-full max-w-[340px] h-[580px] bg-[#0b0f19] rounded-[36px] border-4 border-neutral-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Phone Notch / Status Bar */}
        <div className="h-7 bg-neutral-900/90 flex items-center justify-between px-6 text-[10px] text-neutral-400 font-mono shrink-0">
          <span>9:41</span>
          <div className="w-16 h-3.5 bg-neutral-950 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-neutral-800 rounded-full" />
          </div>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Flutter AppBar */}
        <div className="bg-[#111827] border-b border-neutral-800 px-4 py-3 flex items-center justify-between shrink-0 shadow-xs">
          <div>
            <div className="text-xs font-extrabold text-white tracking-wide">
              Karmatix Task Manager
            </div>
            <div className="text-[10px] text-neutral-400">
              Clean Architecture Demo
            </div>
          </div>
          <div className="rounded-full bg-sky-950 border border-sky-800/60 px-2 py-0.5 text-[10px] font-bold text-sky-300">
            {completedCount}/{tasks.length} Done
          </div>
        </div>

        {/* Task List (Body) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 relative">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-neutral-500">
              <Sparkles className="h-8 w-8 text-neutral-600 mb-2" />
              <div className="text-xs font-semibold text-neutral-300">
                No tasks available!
              </div>
              <div className="text-[11px] mt-1">
                Tap the &ldquo;+&rdquo; button below to add your first task.
              </div>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="group relative flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-[#141c2e] p-3 text-xs transition hover:border-neutral-700 hover:bg-[#18233a]"
              >
                {/* Checkbox */}
                <button
                  onClick={() => handleToggle(task.id)}
                  className="mt-0.5 text-neutral-400 hover:text-sky-400 transition shrink-0"
                  aria-label="Toggle completion"
                >
                  {task.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-sky-400 fill-sky-400/20" />
                  ) : (
                    <Circle className="h-4 w-4 text-neutral-500 hover:text-neutral-300" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`font-semibold text-xs ${
                        task.isCompleted
                          ? 'line-through text-neutral-500'
                          : 'text-neutral-100'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded shrink-0 ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5">
                      {task.description}
                    </p>
                  )}
                  <span className="text-[9px] text-neutral-500 mt-1 block">
                    {task.createdAt}
                  </span>
                </div>

                {/* Delete Action */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-neutral-500 hover:text-red-400 transition p-1 shrink-0"
                  title="Swipe/Delete Task"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}

          {/* Toast / SnackBar Notification */}
          {snackBarMessage && (
            <div className="absolute bottom-3 left-3 right-3 bg-neutral-900 border border-neutral-700 text-white text-[11px] py-2 px-3 rounded-lg shadow-xl flex items-center justify-between animate-fade-in z-20">
              <span className="truncate">{snackBarMessage}</span>
              <button
                onClick={() => setSnackBarMessage(null)}
                className="text-neutral-400 hover:text-white ml-2"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <div className="p-3 flex justify-end shrink-0 border-t border-neutral-900 bg-[#0d1322]">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition hover:from-sky-600 hover:to-blue-700 hover:scale-105 active:scale-95"
            aria-label="Add task"
          >
            <Plus className="h-4 w-4" />
            <span>New Task</span>
          </button>
        </div>

        {/* Modal Dialog Form */}
        {isDialogOpen && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-30">
            <div className="w-full bg-[#111827] rounded-2xl border border-neutral-700 p-4 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <h4 className="text-xs font-bold text-white">Add New Task</h4>
                <button
                  onClick={() => {
                    setIsDialogOpen(false);
                    setValidationError(null);
                  }}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="e.g. Build SQLite layer"
                    className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-2.5 py-1.5 text-white placeholder-neutral-500 focus:border-sky-500 focus:outline-none"
                    autoFocus
                  />
                  {validationError && (
                    <div className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{validationError}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-neutral-300 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Provide details..."
                    rows={2}
                    className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-2.5 py-1.5 text-white placeholder-neutral-500 focus:border-sky-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-neutral-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) =>
                      setNewPriority(e.target.value as 'low' | 'medium' | 'high')
                    }
                    className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-2.5 py-1.5 text-white focus:border-sky-500 focus:outline-none"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setValidationError(null);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
