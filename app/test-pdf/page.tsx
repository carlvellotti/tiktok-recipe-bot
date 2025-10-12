'use client';

import RecipeDisplay from '../components/RecipeDisplay';

// Mock recipe data based on your actual output
const mockRecipe = {
  title: "Easy Creamy Chicken Tortilla Soup",
  description: "A rich and hearty soup, this creamy chicken tortilla soup is incredibly delicious and easy to make. Packed with shredded chicken, beans, and corn in a flavorful, spiced tomato broth, it's the perfect comfort food for any occasion.",
  ingredients: [
    "1 T olive oil",
    "1 T butter",
    "2 large chicken breasts (about 1.5 lbs)",
    "1 onion, diced",
    "1 jalapeño, diced (seeds removed for less heat)",
    "8-10 cloves garlic, minced",
    "3 tsp ground cumin",
    "1 tsp chili powder",
    "1 tsp smoked paprika",
    "1 tsp oregano",
    "Salt and freshly ground black pepper, to taste",
    "4 cups chicken broth",
    "1 (24 oz) can crushed tomatoes",
    "1 (4 oz) can green chilies",
    "1-2 tsp chicken bouillon (optional)",
    "1 T diced chipotle peppers in adobo",
    "1 can pinto beans, drained and rinsed",
    "1 can corn, drained",
    "1 bay leaf",
    "4 oz cream cheese, softened",
    "Juice of 1 lime",
    "Fresh cilantro, chopped",
    "For Toppings: Tortilla chips, shredded cheese, sliced avocado, sliced jalapeño, cilantro"
  ],
  instructions: [
    "Coat the <strong>chicken breasts</strong> (2 large) with a bit of <strong>olive oil</strong> and season them with <strong>salt</strong>, <strong>pepper</strong>, <strong>cumin</strong>, <strong>smoked paprika</strong>, <strong>chili powder</strong>, and <strong>oregano</strong>.",
    "In a large pot or Dutch oven over medium-high heat, melt the <strong>butter</strong> (1 T). Add the seasoned <strong>chicken breasts</strong> and sear for a few minutes on each side until a nice crust forms. The chicken does not need to be cooked through. Remove from the pot and set aside.",
    "In the same pot, add a touch more <strong>olive oil</strong> if needed. Add the <strong>diced onion</strong> (1) and <strong>diced jalapeño</strong> (1). Season with a pinch of <strong>salt</strong>. Sauté for about 5 minutes until softened.",
    "Add the remaining spices: <strong>ground cumin</strong> (3 tsp), <strong>chili powder</strong> (1 tsp), <strong>smoked paprika</strong> (1 tsp), and <strong>oregano</strong> (1 tsp). Stir and toast the spices for about 30 seconds until fragrant.",
    "Add the <strong>minced garlic</strong> (8-10 cloves) and cook for another 30 seconds, stirring constantly.",
    "Pour in the <strong>chicken broth</strong> (4 cups), <strong>crushed tomatoes</strong> (24 oz can), <strong>canned green chilies</strong> (4 oz can), <strong>diced chipotle peppers</strong> (1 T), and optional <strong>chicken bouillon</strong> (1-2 tsp). Stir to combine.",
    "Add the <strong>bay leaf</strong> (1) and return the seared <strong>chicken breasts</strong> to the pot. Bring the soup to a simmer, then reduce heat, cover, and let it cook for 20 minutes, or until the chicken is fully cooked and tender.",
    "Carefully remove the cooked <strong>chicken breasts</strong> from the pot and discard the <strong>bay leaf</strong>. Using two forks, shred the chicken.",
    "Add the <strong>drained pinto beans</strong> (1 can), <strong>drained corn</strong> (1 can), and the shredded chicken back into the soup. Simmer for a few minutes to heat everything through. Season again with <strong>salt</strong> and <strong>pepper</strong> to taste.",
    "Turn the heat to low. Add the <strong>softened cream cheese</strong> (4 oz), a generous amount of <strong>chopped fresh cilantro</strong>, and the <strong>juice of 1 lime</strong>. Stir continuously until the cream cheese is fully melted and incorporated, creating a creamy broth.",
    "Ladle the soup into bowls. Serve immediately, garnished with toppings like <strong>tortilla chips</strong>, <strong>shredded cheese</strong>, <strong>sliced avocado</strong>, and fresh <strong>jalapeño slices</strong>."
  ],
  cookTime: "Approximately 40 minutes",
  servings: "4-6 servings",
  coverImage: "https://p16-pu-sign-useast8.tiktokcdn-us.com/tos-useast8-p-0068-tx2/a5426bde9d234eacb12e25e05db62cfb_1728851376~tplv-tiktokx-dmt-logoccm:300:400:tos-useast8-i-0068-tx2/ootJI8KIACuhYABiiAAiVhaqEfLBzViBXAb1MA.jpeg?dr=1368&refresh_token=d137d4e7&x-expires=1760364000&x-signature=IZ1Mhx%2FBLbjBull3BM%2B%2BazNmksA%3D&t=bacd0480&ps=933b5bde&shp=d05b14bd&shcp=1d1a97fc&idc=maliva&biz_tag=tt_video&s=AWEME_DETAIL&sc=cover",
  sourceUrl: "https://www.tiktok.com/@feelgoodfoodie/video/7422928669472992555"
};

export default function TestPDFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
          <p className="font-bold">🧪 Test Mode</p>
          <p className="text-sm">This page uses mock data so you can quickly iterate on the PDF format without waiting for the LLM.</p>
        </div>
      </div>
      
      <RecipeDisplay recipe={mockRecipe} />
    </div>
  );
}

