import { fireEvent, render, screen } from '@testing-library/react';
import { useCallback, useMemo, useState } from 'react';

import { SearchInput } from '@/components/SearchInput';
import type { SwapiPerson } from '@/types/swapi';

const MOCK_SUGGESTIONS: SwapiPerson[] = [
  {
    name: 'Jabba Desilijic Tiure',
    height: '175',
    mass: '1,358',
    hair_color: 'n/a',
    skin_color: 'green-tan',
    eye_color: 'orange',
    birth_year: '600BBY',
    gender: 'hermaphrodite',
  },
  {
    name: 'Jango Fett',
    height: '183',
    mass: '79',
    hair_color: 'black',
    skin_color: 'tan',
    eye_color: 'brown',
    birth_year: '66BBY',
    gender: 'male',
  },
];

const SearchInputHarness = () => {
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<SwapiPerson | null>(null);

  const suggestions = useMemo(
    () =>
      MOCK_SUGGESTIONS.filter((person) =>
        person.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

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

  return (
    <>
      <SearchInput
        value={query}
        onQueryChange={handleQueryChange}
        suggestions={suggestions}
        isFetching={false}
        onSuggestionSelect={setSelectedPerson}
      />
      {selectedPerson ? <p data-testid="selected-name">{selectedPerson.name}</p> : null}
    </>
  );
};

describe('SearchInput', () => {
  it('hides suggestions after selection and supports clearing the selected value', () => {
    render(<SearchInputHarness />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'ja' } });

    const suggestion = screen.getByRole('button', { name: 'Jango Fett' });
    fireEvent.click(suggestion);

    expect(input).toHaveValue('Jango Fett');
    expect(screen.queryByRole('button', { name: 'Jango Fett' })).not.toBeInTheDocument();
    expect(screen.getByTestId('selected-name')).toHaveTextContent('Jango Fett');

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
    expect(screen.queryByTestId('selected-name')).not.toBeInTheDocument();
  });
});
