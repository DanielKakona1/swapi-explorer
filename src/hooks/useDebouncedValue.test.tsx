import { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const TestComponent = () => {
  const [value, setValue] = useState('');
  const debounced = useDebouncedValue(value, 300);

  return (
    <div>
      <input
        aria-label="query"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <span data-testid="debounced-value">{debounced}</span>
    </div>
  );
};

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('updates value only after the debounce delay', () => {
    render(<TestComponent />);

    fireEvent.change(screen.getByLabelText('query'), {
      target: { value: 'ja' },
    });

    expect(screen.getByTestId('debounced-value')).toHaveTextContent('');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getByTestId('debounced-value')).toHaveTextContent('ja');
  });
});
