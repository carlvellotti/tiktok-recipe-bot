import type { Meta, StoryObj } from '@storybook/nextjs';
import SubmitButton from './SubmitButton';

/**
 * SubmitButton is a full-width button with loading state and customizable text.
 */
const meta = {
  title: 'Components/SubmitButton',
  component: SubmitButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A prominent submit button with loading spinner and hover effects.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner when true',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    type: {
      control: 'select',
      options: ['button', 'submit'],
      description: 'HTML button type',
    },
    text: {
      control: 'text',
      description: 'Button text in default state',
    },
    loadingText: {
      control: 'text',
      description: 'Text shown during loading state',
    },
  },
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button state
 */
export const Default: Story = {
  args: {
    loading: false,
    disabled: false,
    onClick: () => console.log('Button clicked'),
  },
};

/**
 * Loading state with spinner
 */
export const Loading: Story = {
  args: {
    loading: true,
    onClick: () => console.log('Button clicked'),
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: () => console.log('Button clicked'),
  },
};

/**
 * Custom text
 */
export const CustomText: Story = {
  args: {
    text: 'submit recipe',
    loadingText: 'submitting...',
    onClick: () => console.log('Button clicked'),
  },
};

/**
 * Loading with custom text
 */
export const LoadingWithCustomText: Story = {
  args: {
    loading: true,
    text: 'analyze video',
    loadingText: 'analyzing video...',
    onClick: () => console.log('Button clicked'),
  },
};

