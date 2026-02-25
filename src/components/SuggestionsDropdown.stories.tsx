import type { Meta, StoryObj } from '@storybook/react';

import { SuggestionsDropdown } from '@/components/SuggestionsDropdown';

const meta: Meta<typeof SuggestionsDropdown> = {
  title: 'Components/SuggestionsDropdown',
  component: SuggestionsDropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SuggestionsDropdown>;

const baseSuggestions = [
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

export const Default: Story = {
  args: {
    suggestions: baseSuggestions,
    isLoading: false,
    onSelect: () => undefined,
  },
};

export const Loading: Story = {
  args: {
    suggestions: [],
    isLoading: true,
    onSelect: () => undefined,
  },
};

export const Empty: Story = {
  args: {
    suggestions: [],
    isLoading: false,
    onSelect: () => undefined,
  },
};
