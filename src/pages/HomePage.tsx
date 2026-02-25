import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { EmptyState } from '@/components/EmptyState';
import { ResultCard } from '@/components/ResultCard';
import { SearchInput } from '@/components/SearchInput';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useSwapiPeopleSearch } from '@/hooks/useSwapiPeopleSearch';
import type { SwapiPerson } from '@/types/swapi';

const HomePage = () => {
  const { isDarkMode, toggleTheme } = useDarkMode();
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<SwapiPerson | null>(null);

  const debouncedQuery = useDebouncedValue(query, 300);
  const { data, isFetching, isError, error } = useSwapiPeopleSearch(debouncedQuery);

  const suggestions = useMemo(() => data?.results ?? [], [data]);

  const handleQueryChange = useCallback((nextQuery: string) => {
    setQuery(nextQuery);
    setSelectedPerson((currentPerson) => {
      if (!currentPerson) {
        return null;
      }

      return currentPerson.name.toLowerCase() === nextQuery.trim().toLowerCase()
        ? currentPerson
        : null;
    });
  }, []);

  const handleSuggestionSelect = useCallback((person: SwapiPerson) => {
    setSelectedPerson(person);
    setQuery(person.name);
  }, []);

  const errorMessage = useMemo(() => {
    if (!isError) {
      return '';
    }

    return error instanceof Error ? error.message : 'Something went wrong.';
  }, [error, isError]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-900/40" />
        <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-amber-300/40 blur-3xl dark:bg-amber-700/30" />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60 sm:p-8"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
                SWAPI Explorer
              </p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
                Find any Star Wars character
              </h1>
            </div>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
          </div>

          <SearchInput
            value={query}
            onQueryChange={handleQueryChange}
            suggestions={suggestions}
            isFetching={isFetching && debouncedQuery.trim().length >= 2}
            onSuggestionSelect={handleSuggestionSelect}
          />

          {!selectedPerson && query.trim().length < 2 ? <EmptyState /> : null}

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
              {errorMessage}
            </div>
          ) : null}

          {selectedPerson ? <ResultCard person={selectedPerson} /> : null}
        </motion.section>
      </main>
    </div>
  );
};

export default HomePage;
