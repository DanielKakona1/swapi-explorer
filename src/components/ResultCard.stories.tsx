import type { Meta, StoryObj } from '@storybook/react';

import { ResultCard } from '@/components/ResultCard';

const meta: Meta<typeof ResultCard> = {
  title: 'Components/ResultCard',
  component: ResultCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResultCard>;

export const Default: Story = {
  args: {
    person: {
      name: 'Jango Fett',
      height: '183',
      mass: '79',
      hair_color: 'black',
      skin_color: 'tan',
      eye_color: 'brown',
      birth_year: '66BBY',
      gender: 'male',
    },
  },
};

export const Leia: Story = {
  args: {
    person: {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '19BBY',
      gender: 'female',
    },
  },
};
