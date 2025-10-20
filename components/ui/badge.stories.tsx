import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './badge';

/**
 * Badge component for displaying status, categories, or short snippets of information.
 * Perfect for nutrition labels like calories, protein, carbs, etc.
 */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile badge component with multiple variants for displaying labels, tags, and status indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge style with primary colors
 */
export const Default: Story = {
  args: {
    children: '450 cal',
  },
};

/**
 * Secondary badge style
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '12g protein',
  },
};

/**
 * Destructive badge for warnings or errors
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'High sodium',
  },
};

/**
 * Outline badge with transparent background
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Vegan',
  },
};

/**
 * Example: Nutrition badges for a recipe
 */
export const NutritionSet: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge className="bg-blue-600 text-white border-transparent hover:bg-blue-700">450 cal</Badge>
      <Badge className="bg-green-600 text-white border-transparent hover:bg-green-700">12g protein</Badge>
      <Badge className="bg-orange-600 text-white border-transparent hover:bg-orange-700">60g carbs</Badge>
      <Badge className="bg-red-600 text-white border-transparent hover:bg-red-700">8g fat</Badge>
      <Badge className="bg-purple-600 text-white border-transparent hover:bg-purple-700">3g fiber</Badge>
    </div>
  ),
};

/**
 * Example: Diet and meal type tags
 */
export const DietTags: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="secondary">Vegetarian</Badge>
      <Badge variant="secondary">Gluten-free</Badge>
      <Badge variant="secondary">Quick</Badge>
      <Badge variant="secondary">30 min</Badge>
    </div>
  ),
};

/**
 * Small text badge
 */
export const SmallText: Story = {
  args: {
    children: 'New',
    className: 'text-[10px]',
  },
};

/**
 * Large badge
 */
export const Large: Story = {
  args: {
    children: 'Featured Recipe',
    className: 'text-sm px-4 py-1',
  },
};
