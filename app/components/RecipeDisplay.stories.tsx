import type { Meta, StoryObj } from '@storybook/nextjs';
import RecipeDisplay from './RecipeDisplay';

/**
 * RecipeDisplay component shows a formatted recipe with ingredients, instructions,
 * and a PDF download feature. It supports responsive layouts and includes a cover image.
 */
const meta = {
  title: 'Components/RecipeDisplay',
  component: RecipeDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive recipe display component with PDF export functionality, responsive design, and Tailwind styling.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default recipe example with all fields populated
 */
export const Default: Story = {
  args: {
    recipe: {
      title: 'Classic Chocolate Chip Cookies',
      description: 'Soft and chewy cookies with gooey chocolate chips. Perfect for any occasion!',
      cookTime: '25 minutes',
      servings: '24 cookies',
      coverImage: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=533&fit=crop',
      sourceUrl: 'https://example.com/recipe',
      ingredients: [
        '2 1/4 cups all-purpose flour',
        '1 tsp baking soda',
        '1 tsp salt',
        '1 cup (2 sticks) butter, softened',
        '3/4 cup granulated sugar',
        '3/4 cup packed brown sugar',
        '2 large eggs',
        '2 tsp vanilla extract',
        '2 cups (12 oz) semi-sweet chocolate chips',
        '1 cup chopped nuts (optional)',
      ],
      instructions: [
        'Preheat oven to 375°F (190°C).',
        'Combine flour, baking soda and salt in small bowl.',
        'Beat butter, granulated sugar, brown sugar and vanilla extract in large mixer bowl until creamy.',
        'Add eggs, one at a time, beating well after each addition.',
        'Gradually beat in flour mixture.',
        'Stir in chocolate chips and nuts.',
        'Drop by rounded tablespoon onto ungreased baking sheets.',
        'Bake for 9 to 11 minutes or until golden brown.',
        'Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.',
      ],
    },
  },
};

/**
 * Recipe without an image
 */
export const WithoutImage: Story = {
  args: {
    recipe: {
      title: 'Simple Pasta Carbonara',
      description: 'A classic Italian pasta dish made with eggs, cheese, and pancetta.',
      cookTime: '20 minutes',
      servings: '4 servings',
      sourceUrl: 'https://example.com/carbonara',
      ingredients: [
        '1 lb spaghetti',
        '6 oz pancetta or bacon, diced',
        '4 large eggs',
        '1 cup grated Parmesan cheese',
        '2 cloves garlic, minced',
        'Black pepper to taste',
        'Salt for pasta water',
      ],
      instructions: [
        'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
        'While pasta cooks, fry pancetta in a large skillet until crispy.',
        'In a bowl, whisk together eggs and Parmesan cheese.',
        'Drain pasta, reserving 1 cup of pasta water.',
        'Add hot pasta to the skillet with pancetta.',
        'Remove from heat and quickly stir in egg mixture, adding pasta water as needed for creaminess.',
        'Season with black pepper and serve immediately.',
      ],
    },
  },
};

/**
 * Recipe with minimal information
 */
export const MinimalRecipe: Story = {
  args: {
    recipe: {
      title: 'Quick Scrambled Eggs',
      description: 'The fastest breakfast you can make!',
      ingredients: [
        '3 large eggs',
        '2 tbsp milk',
        '1 tbsp butter',
        'Salt and pepper',
      ],
      instructions: [
        'Whisk eggs and milk together.',
        'Heat butter in a non-stick pan over medium heat.',
        'Pour in egg mixture and gently stir until cooked to desired consistency.',
        'Season with salt and pepper and serve hot.',
      ],
    },
  },
};

/**
 * Long recipe with many ingredients and detailed instructions
 */
export const LongRecipe: Story = {
  args: {
    recipe: {
      title: 'Traditional Homemade Lasagna',
      description: 'A hearty Italian classic with layers of pasta, meat sauce, and creamy cheese. This recipe takes time but the results are worth it!',
      cookTime: '2 hours 30 minutes',
      servings: '12 servings',
      coverImage: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=533&fit=crop',
      sourceUrl: 'https://example.com/lasagna',
      ingredients: [
        '1 lb ground beef',
        '1 lb Italian sausage',
        '1 onion, diced',
        '4 cloves garlic, minced',
        '28 oz can crushed tomatoes',
        '12 oz can tomato paste',
        '15 oz can tomato sauce',
        '1/2 cup water',
        '2 tbsp sugar',
        '1 1/2 tsp dried basil',
        '1/2 tsp fennel seeds',
        '1 tsp Italian seasoning',
        '1 tbsp salt (divided)',
        '1/4 tsp black pepper',
        '4 tbsp fresh parsley, chopped',
        '12 lasagna noodles',
        '16 oz ricotta cheese',
        '1 egg',
        '3/4 lb mozzarella cheese, sliced',
        '3/4 cup grated Parmesan cheese',
      ],
      instructions: [
        '<strong>Prepare the meat sauce:</strong> In a Dutch oven, cook sausage, ground beef, onion, and garlic over medium heat until well browned.',
        'Stir in crushed tomatoes, tomato paste, tomato sauce, and water.',
        'Season with sugar, basil, fennel seeds, Italian seasoning, 1 tablespoon salt, pepper, and 2 tablespoons parsley.',
        'Simmer, covered, for about 1 1/2 hours, stirring occasionally.',
        '<strong>Cook the noodles:</strong> Bring a large pot of lightly salted water to a boil. Cook lasagna noodles in boiling water for 8 to 10 minutes. Drain noodles, and rinse with cold water.',
        '<strong>Prepare cheese mixture:</strong> In a mixing bowl, combine ricotta cheese with egg, remaining parsley, and 1/2 teaspoon salt.',
        '<strong>Assemble the lasagna:</strong> Preheat oven to 375°F (190°C).',
        'To assemble, spread 1 1/2 cups of meat sauce in the bottom of a 9x13 inch baking dish.',
        'Arrange 6 noodles lengthwise over meat sauce.',
        'Spread with one half of the ricotta cheese mixture.',
        'Top with a third of mozzarella cheese slices.',
        'Spoon 1 1/2 cups meat sauce over mozzarella, and sprinkle with 1/4 cup Parmesan cheese.',
        'Repeat layers, and top with remaining mozzarella and Parmesan cheese.',
        'Cover with foil: to prevent sticking, either spray foil with cooking spray, or make sure the foil does not touch the cheese.',
        '<strong>Bake:</strong> Bake in preheated oven for 25 minutes.',
        'Remove foil, and bake an additional 25 minutes.',
        'Cool for 15 minutes before serving.',
      ],
    },
  },
};

/**
 * Recipe with HTML formatting in instructions
 */
export const WithFormattedInstructions: Story = {
  args: {
    recipe: {
      title: 'Perfect Roasted Chicken',
      description: 'Juicy roasted chicken with crispy skin and aromatic herbs.',
      cookTime: '1 hour 30 minutes',
      servings: '6 servings',
      coverImage: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=533&fit=crop',
      ingredients: [
        '1 whole chicken (4-5 lbs)',
        '2 tbsp olive oil',
        '1 lemon, halved',
        '6 cloves garlic',
        'Fresh rosemary and thyme',
        'Salt and black pepper',
      ],
      instructions: [
        '<strong>Preheat oven to 425°F</strong> and pat chicken dry with paper towels.',
        'Season the cavity with <strong>salt and pepper</strong>, then stuff with lemon halves, garlic, and herbs.',
        'Rub the outside with olive oil and season generously with <strong>salt and pepper</strong>.',
        '<strong>Important:</strong> Tie the legs together with kitchen twine and tuck wing tips under.',
        'Place on a rack in a roasting pan and roast for <strong>60-75 minutes</strong> until internal temperature reaches 165°F.',
        'Let rest for <strong>15 minutes</strong> before carving.',
      ],
    },
  },
};

/**
 * Vegan recipe example
 */
export const VeganRecipe: Story = {
  args: {
    recipe: {
      title: 'Creamy Vegan Buddha Bowl',
      description: 'A nutritious and colorful plant-based meal packed with protein, veggies, and a tahini dressing.',
      cookTime: '35 minutes',
      servings: '4 bowls',
      coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=533&fit=crop',
      sourceUrl: 'https://example.com/buddha-bowl',
      ingredients: [
        '1 cup quinoa, uncooked',
        '1 can (15 oz) chickpeas, drained',
        '2 sweet potatoes, cubed',
        '2 cups kale, chopped',
        '1 avocado, sliced',
        '1/4 cup tahini',
        '2 tbsp lemon juice',
        '1 tsp maple syrup',
        '2 tbsp olive oil',
        '1 tsp cumin',
        '1 tsp paprika',
        'Salt and pepper to taste',
      ],
      instructions: [
        'Preheat oven to 400°F and line a baking sheet with parchment paper.',
        'Toss sweet potato cubes with 1 tbsp olive oil, cumin, paprika, salt and pepper.',
        'Roast for 25-30 minutes until tender and slightly crispy.',
        'While potatoes roast, cook quinoa according to package directions.',
        'Toss chickpeas with remaining olive oil and roast for the last 15 minutes with sweet potatoes.',
        'Make dressing by whisking together tahini, lemon juice, maple syrup, and 2-3 tbsp water until smooth.',
        'Massage kale with a pinch of salt to soften.',
        'Assemble bowls with quinoa as the base, then add roasted sweet potatoes, chickpeas, kale, and avocado.',
        'Drizzle with tahini dressing and serve immediately.',
      ],
    },
  },
};
