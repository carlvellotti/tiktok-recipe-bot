import type { Meta, StoryObj } from '@storybook/nextjs';
import CreatorProfileCard from './CreatorProfileCard';

/**
 * CreatorProfileCard displays a featured recipe creator with their profile image,
 * TikTok badge, username, description, and a link to their profile.
 */
const meta = {
  title: 'Components/CreatorProfileCard',
  component: CreatorProfileCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component for showcasing TikTok recipe creators with hover effects and profile links.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    username: {
      control: 'text',
      description: 'The TikTok username without the @ symbol',
    },
    url: {
      control: 'text',
      description: 'Full URL to the creator\'s TikTok profile',
    },
    image: {
      control: 'text',
      description: 'Path to the creator\'s profile image',
    },
    description: {
      control: 'text',
      description: 'Short description of the creator\'s content style',
    },
  },
} satisfies Meta<typeof CreatorProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default creator profile card
 */
export const Default: Story = {
  args: {
    username: 'majasrecipes',
    url: 'https://www.tiktok.com/@majasrecipes',
    image: '/creators/majasrecipes.jpeg',
    description: 'comfort classics like lasagna, chicken pot pie • cheese croquettes • cinnamon roll cake bars',
  },
};

/**
 * Health-focused creator
 */
export const HealthFocused: Story = {
  args: {
    username: 'stealth_health_life',
    url: 'https://www.tiktok.com/@stealth_health_life',
    image: '/creators/stealth_health_life.jpeg',
    description: 'macro-friendly meal prep • high-protein frozen burritos • sheet pan breakfast sandwiches',
  },
};

/**
 * Creative fusion creator
 */
export const CreativeFusion: Story = {
  args: {
    username: 'heresyourbite',
    url: 'https://www.tiktok.com/@heresyourbite',
    image: '/creators/heresyourbite.jpeg',
    description: 'caramel apple snickerdoodles • 15-min dinners • creative fusion dishes',
  },
};

/**
 * Creator with short description
 */
export const ShortDescription: Story = {
  args: {
    username: 'quickbites',
    url: 'https://www.tiktok.com/@quickbites',
    image: '/creators/majasrecipes.jpeg',
    description: 'easy weeknight dinners',
  },
};

/**
 * Creator with long username
 */
export const LongUsername: Story = {
  args: {
    username: 'the_ultimate_cooking_adventures',
    url: 'https://www.tiktok.com/@the_ultimate_cooking_adventures',
    image: '/creators/heresyourbite.jpeg',
    description: 'exploring cuisines from around the world • authentic recipes • cooking tutorials',
  },
};
