import { render, screen } from '@testing-library/react';

import { ResultCard } from '@/components/ResultCard';
import type { SwapiPerson } from '@/types/swapi';

const mockPerson: SwapiPerson = {
  name: 'Jango Fett',
  height: '183',
  mass: '79',
  hair_color: 'black',
  skin_color: 'tan',
  eye_color: 'brown',
  birth_year: '66BBY',
  gender: 'male',
};

describe('ResultCard', () => {
  it('renders all selected character fields', () => {
    render(<ResultCard person={mockPerson} />);

    expect(screen.getByText('Character details')).toBeInTheDocument();
    expect(screen.getByText('Jango Fett')).toBeInTheDocument();
    expect(screen.getByText('183')).toBeInTheDocument();
    expect(screen.getByText('79')).toBeInTheDocument();
    expect(screen.getByText('black')).toBeInTheDocument();
    expect(screen.getByText('tan')).toBeInTheDocument();
    expect(screen.getByText('brown')).toBeInTheDocument();
    expect(screen.getByText('66BBY')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });
});
