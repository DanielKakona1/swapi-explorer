import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FixedSizeList, type ListChildComponentProps } from 'react-window';

import { SearchSkeleton } from '@/components/skeletons/SearchSkeleton';
import type { SwapiPerson } from '@/types/swapi';

interface SuggestionsDropdownProps {
  suggestions: SwapiPerson[];
  isLoading: boolean;
  onSelect: (person: SwapiPerson) => void;
}

interface VirtualizedItemData {
  suggestions: SwapiPerson[];
  onSelect: (person: SwapiPerson) => void;
}

const ROW_HEIGHT = 44;
const MAX_VISIBLE_ROWS = 6;

const VirtualizedRow = ({
  index,
  style,
  data,
}: ListChildComponentProps<VirtualizedItemData>) => {
  const person = data.suggestions[index];

  return (
    <div style={style} className="px-1 py-0.5">
      <button
        type="button"
        className="h-full w-full rounded-lg px-3 text-left text-sm font-medium text-slate-700 transition hover:bg-cyan-100 hover:text-cyan-900 dark:text-slate-200 dark:hover:bg-cyan-900/40 dark:hover:text-cyan-100"
        onClick={() => data.onSelect(person)}
        data-cy={`suggestion-${person.name}`}
      >
        {person.name}
      </button>
    </div>
  );
};

export const SuggestionsDropdown = memo(
  ({ suggestions, isLoading, onSelect }: SuggestionsDropdownProps) => {
    const shouldVirtualize = suggestions.length > 8;
    const itemData = useMemo(
      () => ({ suggestions, onSelect }),
      [suggestions, onSelect],
    );

    if (isLoading) {
      return <SearchSkeleton rows={3} />;
    }

    if (suggestions.length === 0) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-3 text-sm text-slate-500 shadow-md dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-300">
          No characters found for this search.
        </div>
      );
    }

    if (shouldVirtualize) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-md dark:border-slate-700 dark:bg-slate-900/95">
          <FixedSizeList
            width="100%"
            height={Math.min(suggestions.length, MAX_VISIBLE_ROWS) * ROW_HEIGHT}
            itemCount={suggestions.length}
            itemSize={ROW_HEIGHT}
            itemData={itemData}
          >
            {VirtualizedRow}
          </FixedSizeList>
        </div>
      );
    }

    return (
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: -6 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.04, duration: 0.2 },
          },
        }}
        className="space-y-1 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-md dark:border-slate-700 dark:bg-slate-900/95"
      >
        {suggestions.map((person) => (
          <motion.li
            key={person.name}
            variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
          >
            <button
              type="button"
              onClick={() => onSelect(person)}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-cyan-100 hover:text-cyan-900 dark:text-slate-200 dark:hover:bg-cyan-900/40 dark:hover:text-cyan-100"
              data-cy={`suggestion-${person.name}`}
            >
              {person.name}
            </button>
          </motion.li>
        ))}
      </motion.ul>
    );
  },
);

SuggestionsDropdown.displayName = 'SuggestionsDropdown';
