import type { Meta, StoryObj } from '@storybook/nextjs';
import UrlInputForm from './UrlInputForm';

/**
 * UrlInputForm provides a text input for TikTok video URLs with an optional paste button.
 */
const meta = {
  title: 'Components/UrlInputForm',
  component: UrlInputForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An input field component for TikTok video URLs with clipboard paste functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current value of the input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether the input should auto-focus on mount',
    },
  },
} satisfies Meta<typeof UrlInputForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty state
 */
export const Default: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('URL changed:', value),
    onPaste: () => console.log('Paste clicked'),
  },
};

/**
 * With URL filled in
 */
export const WithUrl: Story = {
  args: {
    value: 'https://www.tiktok.com/@majasrecipes/video/1234567890',
    onChange: (value) => console.log('URL changed:', value),
    onPaste: () => console.log('Paste clicked'),
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    value: 'https://www.tiktok.com/@majasrecipes/video/1234567890',
    onChange: (value) => console.log('URL changed:', value),
    onPaste: () => console.log('Paste clicked'),
    disabled: true,
  },
};

/**
 * Without paste button
 */
export const WithoutPasteButton: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('URL changed:', value),
  },
};

