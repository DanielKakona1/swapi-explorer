import { memo } from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle = memo(({ isDarkMode, onToggle }: ThemeToggleProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-200"
      aria-label="Toggle dark mode"
      data-cy="theme-toggle"
    >
      <span className="text-base" aria-hidden>
        {isDarkMode ? '🌙' : '☀️'}
      </span>
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
