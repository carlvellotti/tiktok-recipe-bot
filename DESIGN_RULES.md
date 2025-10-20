# Design System Rules - TikTok Recipe Bot

## Overview
This document defines the design system constraints for the TikTok Recipe Bot. It serves as a machine-readable specification that AI agents can parse when implementing new features.

## Component Library

### Source
**shadcn/ui** - Copy-paste component library built on Radix UI primitives

### Installation Pattern
```bash
# Components are added individually via CLI
npx shadcn@latest add [component-name]

# Example:
npx shadcn@latest add badge
npx shadcn@latest add tooltip
npx shadcn@latest add card
```

### Registry
- **Location**: `components/ui/`
- **Pattern**: Each component lives in its own file (e.g., `badge.tsx`, `tooltip.tsx`)
- **Imports**: Use absolute imports via TypeScript path aliases
  ```typescript
  import { Badge } from "@/components/ui/badge"
  ```

### Available Components (Installed)
- `Badge` - Label component with variants (default, secondary, destructive, outline) for nutrition labels, tags, and status indicators
- `Tooltip` - Hover tooltips with accessibility support
- `Calendar` - Date picker with keyboard navigation and accessibility support
- `Button` - Interactive button component with multiple variants (dependency of Calendar)
- (Add more as they are installed)

### Component Addition Workflow
1. Identify needed component from [shadcn/ui docs](https://ui.shadcn.com/docs/components)
2. Run `npx shadcn@latest add [component-name]`
3. Component is copied to `components/ui/`
4. **Create Storybook story** at `components/ui/[component-name].stories.tsx`
5. **Verify in Storybook** - restart Storybook if needed and check component appears
6. Import and use in application code
7. Document in this file under "Available Components"

## Design Tokens

### Colors
```typescript
// Defined in tailwind.config.ts
const colors = {
  // Primary brand color
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },

  // Secondary/accent
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },

  // Destructive (errors, warnings)
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },

  // UI elements
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",

  // Nutrition-specific (to be defined)
  nutrition: {
    calories: "hsl(220, 90%, 56%)",    // Blue
    protein: "hsl(142, 76%, 36%)",     // Green
    carbs: "hsl(25, 95%, 53%)",        // Orange
    fat: "hsl(358, 75%, 59%)",         // Red
    fiber: "hsl(262, 83%, 58%)",       // Purple
  }
}
```

### Typography
```typescript
// Font family
fontFamily: {
  sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
}

// Font sizes (use Tailwind utility classes)
text-xs   // 0.75rem (12px)
text-sm   // 0.875rem (14px)
text-base // 1rem (16px)
text-lg   // 1.125rem (18px)
text-xl   // 1.25rem (20px)
text-2xl  // 1.5rem (24px)
text-3xl  // 1.875rem (30px)
text-4xl  // 2.25rem (36px)

// Font weights
font-normal   // 400
font-medium   // 500
font-semibold // 600
font-bold     // 700
```

### Spacing
```typescript
// Use Tailwind spacing scale (4px base unit)
// Recommended values for consistency:
p-2   // 8px padding
p-4   // 16px padding
p-6   // 24px padding
p-8   // 32px padding

m-2   // 8px margin
m-4   // 16px margin
m-6   // 24px margin
m-8   // 32px margin

gap-2 // 8px gap (flexbox/grid)
gap-4 // 16px gap
gap-6 // 24px gap
```

### Border Radius
```typescript
// Defined in tailwind.config.ts
borderRadius: {
  lg: "var(--radius)",      // 0.5rem (8px) - cards, containers
  md: "calc(var(--radius) - 2px)", // 6px - buttons, badges
  sm: "calc(var(--radius) - 4px)", // 4px - small elements
}
```

### Shadows
```typescript
// Use Tailwind shadow utilities
shadow-sm  // Subtle shadow for slight elevation
shadow-md  // Medium shadow for cards
shadow-lg  // Larger shadow for modals, dropdowns
```

## Component Patterns

### Card Pattern
```typescript
// For recipe display, ingredients, etc.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Badge Pattern
```typescript
// For macro nutrition display
import { Badge } from "@/components/ui/badge"

<Badge variant="default">450 cal</Badge>
<Badge variant="secondary">12g protein</Badge>
```

### Tooltip Pattern
```typescript
// For explanatory text
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Explanation text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Calendar Pattern
```typescript
// For date selection
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>
```

## Layout Guidelines

### Responsive Design
- **Mobile-first approach**: Design for mobile (320px+) first, then scale up
- **Breakpoints** (Tailwind):
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

### Container Width
```typescript
// Use Tailwind container utilities
<div className="container mx-auto px-4">
  {/* Content */}
</div>
```

### Grid & Flexbox
```typescript
// Prefer CSS Grid for 2D layouts
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// Prefer Flexbox for 1D layouts
<div className="flex flex-col md:flex-row gap-4">
```

## Accessibility Requirements

### Color Contrast
- **WCAG AA minimum**: 4.5:1 for normal text, 3:1 for large text
- Test all color combinations with contrast checker
- Don't rely on color alone to convey information

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Maintain logical tab order
- Visible focus indicators requiredOkay, so basically it displayed it explained like how this design system worked with all the design tokens and how to import.

### Screen Reader Support
- Use semantic HTML (`<main>`, `<nav>`, `<section>`)
- Provide ARIA labels where needed
- Alt text for images

### Testing
- Use Storybook a11y addon for automated checks
- Manual testing with screen reader (VoiceOver/NVDA)

## Macro Nutrition Display - Specific Rules

### Badge Variants
```typescript
// Use badge component for macro display
<Badge className="bg-nutrition-calories">450 cal</Badge>
<Badge className="bg-nutrition-protein">12g protein</Badge>
<Badge className="bg-nutrition-carbs">60g carbs</Badge>
<Badge className="bg-nutrition-fat">8g fat</Badge>
<Badge className="bg-nutrition-fiber">3g fiber</Badge>
```

### Formatting Rules
- **Calories**: Whole number (no decimals) + "cal" suffix
- **Macros**: 1 decimal place + "g" suffix
- **Layout**: Display inline with cook time and servings
- **Mobile**: Stack vertically, full width badges
- **Desktop**: Display horizontally in a row

### Icons (Optional Enhancement)
If icons are added:
- Use `lucide-react` icon library (already available)
- Size: 16px for inline badges
- Position: Left of text
- Example: `<Flame className="w-4 h-4" />` for calories

## Storybook Guidelines

### Story File Locations
Stories are automatically discovered in the following directories (configured in `.storybook/main.ts`):
- `stories/**/*.stories.tsx` - Example/demo stories
- `app/**/*.stories.tsx` - Application component stories
- `components/**/*.stories.tsx` - UI component library stories (shadcn/ui)

**Important**: After updating `.storybook/main.ts`, you must restart Storybook for changes to take effect.

### Story Structure
```typescript
// For shadcn/ui components: components/ui/calendar.stories.tsx
// For app components: app/components/RecipeDisplay.stories.tsx
"use client" // Required for interactive components with hooks

import type { Meta, StoryObj } from '@storybook/nextjs'
import { Calendar } from './calendar'
import { useState } from 'react'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered', // or 'padded', 'fullscreen'
    docs: {
      description: {
        component: 'Component description here',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for props
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

// For stateful components, use render function
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <Calendar mode="single" selected={date} onSelect={setDate} />
  },
}

// For stateless components, use args
export const Simple: Story = {
  args: {
    prop1: 'value',
  }
}
```

### Visual Regression Testing
- Use Chromatic for visual regression tests
- Capture stories at multiple viewports:
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1280px

## File Organization

```
tiktok-recipe-bot/
├── app/
│   ├── components/
│   │   └── RecipeDisplay.tsx        # Main components
│   ├── api/
│   │   ├── extract-recipe/
│   │   │   └── route.ts
│   │   └── calculate-macros/
│   │       └── route.ts
│   └── lib/
│       ├── nutrition.ts             # Business logic
│       ├── ingredients.ts
│       └── api-client.ts
├── components/
│   └── ui/                          # shadcn/ui components
│       ├── badge.tsx
│       ├── tooltip.tsx
│       └── card.tsx
├── stories/
│   └── RecipeDisplay.stories.tsx   # Storybook stories
└── __tests__/
    ├── unit/
    ├── integration/
    └── e2e/
```

## AI Agent Instructions

When implementing new features:

1. **Use only shadcn/ui components** from `components/ui/`
2. **Install new components** with `npx shadcn@latest add [name]` before use
3. **Follow design tokens** defined in this document
4. **Maintain accessibility** standards (WCAG AA minimum)
5. **Create Storybook stories** for all new visual components
   - Place shadcn/ui component stories in `components/ui/[component].stories.tsx`
   - Place app component stories in `app/components/[component].stories.tsx`
   - Use `"use client"` directive for interactive components with hooks
   - Use `render` function for stateful components with useState/useEffect
   - Use `args` for stateless components
6. **Verify component in Storybook** before marking task complete
   - Check component appears in sidebar
   - Test all story variants
   - Verify on localhost:6006
7. **Use TypeScript** for type safety
8. **Follow TDD** - write tests first, then implementation
9. **Document changes** - update this file when adding new components
10. **Restart Storybook** if configuration changes are made to `.storybook/main.ts`

## Version Control

When this design system is updated:
1. Update this document
2. Run Storybook visual regression tests
3. Update component library in `package.json` if needed
4. Communicate changes to team

---

**Last Updated**: 2025-01-19
**Version**: 1.0.0
**Maintained By**: Development Team
