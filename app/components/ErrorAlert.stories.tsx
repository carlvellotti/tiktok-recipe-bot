import type { Meta, StoryObj } from '@storybook/nextjs';
import ErrorAlert from './ErrorAlert';

/**
 * ErrorAlert displays error messages with optional dismiss functionality.
 */
const meta = {
  title: 'Components/ErrorAlert',
  component: ErrorAlert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An error alert component for displaying user-facing error messages with dismiss option.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'text',
      description: 'The error message to display',
    },
    onDismiss: {
      description: 'Optional callback when dismiss button is clicked',
    },
  },
} satisfies Meta<typeof ErrorAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default error message
 */
export const Default: Story = {
  args: {
    error: 'Failed to extract recipe. Please try again.',
  },
};

/**
 * With dismiss button
 */
export const WithDismiss: Story = {
  args: {
    error: 'Invalid TikTok URL. Please check the format and try again.',
    onDismiss: () => console.log('Error dismissed'),
  },
};

/**
 * Network error
 */
export const NetworkError: Story = {
  args: {
    error: 'Network error: Unable to connect to the server. Please check your internet connection.',
    onDismiss: () => console.log('Error dismissed'),
  },
};

/**
 * Short error message
 */
export const ShortError: Story = {
  args: {
    error: 'Invalid URL',
  },
};

/**
 * Long error message
 */
export const LongError: Story = {
  args: {
    error: 'An unexpected error occurred while processing your request. This could be due to several reasons including invalid video URL, private account, deleted video, or temporary server issues. Please verify the URL is correct and the video is publicly accessible, then try again.',
    onDismiss: () => console.log('Error dismissed'),
  },
};

/**
 * Interactive example
 */
export const Interactive: Story = {
  args: {
    error: 'This is a dismissible error message',
    onDismiss: () => console.log('Error dismissed'),
  },
};
