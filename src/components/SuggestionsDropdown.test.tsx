import { fireEvent, render, screen } from '@testing-library/react';

import { SuggestionsDropdown } from '@/components/SuggestionsDropdown';
import type { SwapiPerson } from '@/types/swapi';

const mockSuggestions: SwapiPerson[] = [
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
    name: 'Jar Jar Binks',
    height: '196',
    mass: '66',
    hair_color: 'none',
    skin_color: 'orange',
    eye_color: 'orange',
    birth_year: '52BBY',
    gender: 'male',
  },
];

describe('SuggestionsDropdown', () => {
  it('renders suggestions and calls onSelect when item is clicked', () => {
    const handleSelect = jest.fn();

    render(
      <SuggestionsDropdown
        suggestions={mockSuggestions}
        isLoading={false}
        onSelect={handleSelect}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Jar Jar Binks' }));

    expect(handleSelect).toHaveBeenCalledWith(mockSuggestions[1]);
  });

  it('shows empty message when there are no suggestions', () => {
    render(
      <SuggestionsDropdown suggestions={[]} isLoading={false} onSelect={jest.fn()} />,
    );

    expect(
      screen.getByText('No characters found for this search.'),
    ).toBeInTheDocument();
  });

  it('shows loading skeleton while fetching suggestions', () => {
    const { container } = render(
      <SuggestionsDropdown suggestions={[]} isLoading={true} onSelect={jest.fn()} />,
    );

    expect(
      screen.queryByText('No characters found for this search.'),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(3);
  });
});
