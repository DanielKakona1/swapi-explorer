import { type ComponentProps, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchInput } from '@/components/SearchInput';
import type { SwapiPerson } from '@/types/swapi';

const STORY_SUGGESTIONS: SwapiPerson[] = [
  {
    name: 'Jabba Desilijic Tiure',
    height: '175',
    mass: '1,358',
    hair_color: 'n/a',
    skin_color: 'green-tan, brown',
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

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

type SearchInputStoryProps = ComponentProps<typeof SearchInput>;

const SearchInputStory = (args: SearchInputStoryProps) => {
  const [query, setQuery] = useState(args.value);

  const filteredSuggestions = useMemo(
    () =>
      STORY_SUGGESTIONS.filter((person) =>
        person.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="w-[26rem] rounded-2xl bg-white p-4 dark:bg-slate-900">
      <SearchInput
        {...args}
        value={query}
        suggestions={filteredSuggestions}
        onQueryChange={setQuery}
        onSuggestionSelect={(person) => {
          args.onSuggestionSelect(person);
        }}
      />
    </div>
  );
};

export const Interactive: Story = {
  args: {
    isFetching: false,
    suggestions: STORY_SUGGESTIONS,
    onSuggestionSelect: () => undefined,
    onQueryChange: () => undefined,
    value: '',
  },
  render: (args) => <SearchInputStory {...args} />,
};

export const LoadingDropdown: Story = {
  args: {
    isFetching: true,
    suggestions: STORY_SUGGESTIONS,
    onSuggestionSelect: () => undefined,
    onQueryChange: () => undefined,
    value: 'ja',
  },
  render: (args) => <SearchInputStory {...args} />,
};

export const EmptyResults: Story = {
  args: {
    isFetching: false,
    suggestions: STORY_SUGGESTIONS,
    onSuggestionSelect: () => undefined,
    onQueryChange: () => undefined,
    value: 'zz',
  },
  render: (args) => <SearchInputStory {...args} />,
};
