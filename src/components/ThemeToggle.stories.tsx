import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeToggle } from '@/components/ThemeToggle';

interface ThemeToggleStoryProps {
  isDarkMode: boolean;
}

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

const ThemeToggleStory = ({ isDarkMode }: ThemeToggleStoryProps) => {
  const [isDark, setIsDark] = useState(isDarkMode);

  return (
    <div className="rounded-2xl bg-white p-6 dark:bg-slate-900">
      <ThemeToggle isDarkMode={isDark} onToggle={() => setIsDark((value) => !value)} />
    </div>
  );
};

export const Interactive: Story = {
  args: {
    isDarkMode: false,
  },
  render: (args) => <ThemeToggleStory isDarkMode={args.isDarkMode} />,
};
