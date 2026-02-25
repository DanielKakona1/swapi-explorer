import { type ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  type ControllerRenderProps,
  useForm,
} from 'react-hook-form';

import { SuggestionsDropdown } from '@/components/SuggestionsDropdown';
import { searchSchema, type SearchSchema } from '@/schemas/searchSchema';
import type { SwapiPerson } from '@/types/swapi';

interface SearchInputProps {
  value: string;
  onQueryChange: (query: string) => void;
  suggestions: SwapiPerson[];
  isFetching: boolean;
  onSuggestionSelect: (person: SwapiPerson) => void;
}

export const SearchInput = memo(
  ({
    value,
    onQueryChange,
    suggestions,
    isFetching,
    onSuggestionSelect,
  }: SearchInputProps) => {
    const [hasConfirmedSelection, setHasConfirmedSelection] = useState(false);

    const {
      control,
      formState: { errors },
    } = useForm<SearchSchema>({
      resolver: zodResolver(searchSchema),
      defaultValues: { query: value },
      values: { query: value },
      mode: 'onChange',
    });

    const showDropdown = useMemo(
      () => value.trim().length >= 2 && !hasConfirmedSelection,
      [hasConfirmedSelection, value],
    );

    const helperText = useMemo(() => {
      if (hasConfirmedSelection) {
        return '';
      }

      if (value.trim().length < 2) {
        return 'Type at least 2 characters to fetch suggestions.';
      }

      if (isFetching) {
        return 'Looking up characters in a galaxy far, far away...';
      }

      return '';
    }, [hasConfirmedSelection, isFetching, value]);

    const handleSuggestionSelect = useCallback(
      (person: SwapiPerson) => {
        setHasConfirmedSelection(true);
        onQueryChange(person.name);
        onSuggestionSelect(person);
      },
      [onQueryChange, onSuggestionSelect],
    );

    return (
      <div>
        <label
          htmlFor="swapi-search"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          Search Star Wars characters
        </label>
        <Controller
          name="query"
          control={control}
          render={({ field }: { field: ControllerRenderProps<SearchSchema, 'query'> }) => (
            <div className="relative">
              <input
                {...field}
                id="swapi-search"
                type="text"
                placeholder="Try: ja"
                autoComplete="off"
                className="w-full rounded-2xl border border-cyan-300 bg-white/90 px-4 py-3 pr-12 text-slate-900 outline-none ring-cyan-500 transition focus:ring-2 dark:border-cyan-700 dark:bg-slate-900/90 dark:text-slate-100"
                data-cy="search-input"
                data-testid="search-input"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setHasConfirmedSelection(false);
                  field.onChange(event);
                  onQueryChange(event.target.value);
                }}
              />

              {hasConfirmedSelection && value.trim().length > 0 ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300 bg-white/95 text-base font-semibold leading-none text-cyan-700 shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:-rotate-90 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-95 dark:border-cyan-700 dark:bg-slate-900/95 dark:text-cyan-300 dark:hover:border-cyan-500 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-200"
                  onClick={() => {
                    setHasConfirmedSelection(false);
                    field.onChange('');
                    onQueryChange('');
                  }}
                >
                  ×
                </button>
              ) : null}
            </div>
          )}
        />
        <div className="mt-2 flex items-center justify-between">
          {helperText ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
          ) : (
            <span />
          )}
          {errors.query ? (
            <p className="text-xs text-rose-500" role="alert">
              {errors.query.message}
            </p>
          ) : null}
        </div>

        {showDropdown ? (
          <div className="relative z-20 mt-3">
            <SuggestionsDropdown
              suggestions={suggestions}
              isLoading={isFetching}
              onSelect={handleSuggestionSelect}
            />
          </div>
        ) : null}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
