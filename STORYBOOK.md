# Storybook Setup Guide

Storybook has been successfully configured for this Next.js project!

## What's Included

### Storybook Features
- **Next.js Integration**: Full support for Next.js 14 App Router
- **TypeScript Support**: Fully typed stories and components
- **Tailwind CSS**: All Tailwind styles are available in Storybook
- **Auto-documentation**: Automatic docs generation with `autodocs`
- **AI-Powered Addons**:
  - `@storybook/addon-docs` - Automatic component documentation
  - `@storybook/addon-onboarding` - Interactive onboarding experience
  - `@storybook/addon-a11y` - Accessibility testing
  - `@storybook/addon-vitest` - Visual testing capabilities

### Component Stories
Created comprehensive stories for `RecipeDisplay` component:
- **Default**: Full recipe with all fields
- **WithoutImage**: Recipe without cover image
- **MinimalRecipe**: Minimal recipe data
- **LongRecipe**: Complex recipe with many ingredients
- **WithFormattedInstructions**: Recipe with HTML formatting
- **VeganRecipe**: Plant-based recipe example

## Getting Started

### Running Storybook
```bash
npm run storybook
```
This will start Storybook on http://localhost:6006

### Building Storybook
```bash
npm run build-storybook
```
Creates a static build in `storybook-static/` directory

## Creating New Stories

### For New Components
1. Create your component in `app/components/`
2. Create a story file: `YourComponent.stories.tsx`
3. Use this template:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from './YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Your props here
  },
};
```

## Project Structure

```
.storybook/
├── main.ts          # Storybook configuration
└── preview.ts       # Global decorators and parameters

app/
└── components/
    ├── RecipeDisplay.tsx
    └── RecipeDisplay.stories.tsx
```

## Configuration Details

### Tailwind Support
Global styles from `app/globals.css` are imported in `.storybook/preview.ts`

### Story Discovery
Stories are discovered from:
- `stories/**/*.stories.*`
- `app/**/*.stories.*`

### Static Assets
Public assets are served from the `public/` directory

## Tips

1. **Use Controls**: Interact with component props in real-time
2. **Check Accessibility**: Use the a11y addon to ensure components are accessible
3. **Auto-docs**: Documentation is generated automatically from TypeScript types and JSDoc comments
4. **Responsive Testing**: Use the viewport addon to test different screen sizes
5. **Dark Mode**: Test components in light/dark mode using the toolbar

## Learn More

- [Storybook Documentation](https://storybook.js.org/docs)
- [Next.js Integration](https://storybook.js.org/docs/get-started/nextjs)
- [Writing Stories](https://storybook.js.org/docs/writing-stories)
