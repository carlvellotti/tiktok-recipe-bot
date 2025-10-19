'use client';

import { useState } from 'react';
import RecipeDisplay from './components/RecipeDisplay';
import CreatorProfileCard from './components/CreatorProfileCard';
import UrlInputForm from './components/UrlInputForm';
import SubmitButton from './components/SubmitButton';
import ErrorAlert from './components/ErrorAlert';
import Lottie from 'lottie-react';
import prepareFoodAnimation from '../Prepare Food.json';

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime?: string;
  servings?: string;
  coverImage?: string;
  sourceUrl?: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const response = await fetch('/api/extract-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract recipe');
      }

      // Add the original URL to the recipe
      setRecipe({ ...data.recipe, sourceUrl: url });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-orange-500 leading-tight py-2">
            🍳 tiktok recipe<br className="sm:hidden" /> extractor
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            turn any tiktok recipe into a formatted pdf
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 w-full lg:max-w-[8.5in] mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <UrlInputForm
              value={url}
              onChange={setUrl}
              onPaste={handlePaste}
              disabled={loading}
              autoFocus
            />

            <SubmitButton loading={loading} />
          </form>

          <ErrorAlert error={error} />
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="flex items-center justify-center mb-8 -mt-8 sm:-mt-16">
            <Lottie 
              animationData={prepareFoodAnimation} 
              loop={true}
              className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]"
            />
          </div>
        )}

        {/* Recipe Display */}
        {recipe && <RecipeDisplay recipe={recipe} />}

        {/* Good Recipes */}
        <div className="mt-8 mb-8 w-full lg:max-w-[8.5in] mx-auto">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            good recipe sources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                username: 'majasrecipes',
                url: 'https://www.tiktok.com/@majasrecipes',
                image: '/creators/majasrecipes.jpeg',
                description: 'comfort classics like lasagna, chicken pot pie • cheese croquettes • cinnamon roll cake bars'
              },
              {
                username: 'stealth_health_life',
                url: 'https://www.tiktok.com/@stealth_health_life',
                image: '/creators/stealth_health_life.jpeg',
                description: 'macro-friendly meal prep • high-protein frozen burritos • sheet pan breakfast sandwiches'
              },
              {
                username: 'heresyourbite',
                url: 'https://www.tiktok.com/@heresyourbite',
                image: '/creators/heresyourbite.jpeg',
                description: 'caramel apple snickerdoodles • 15-min dinners • creative fusion dishes'
              },
            ].map((creator) => (
              <CreatorProfileCard
                key={creator.username}
                username={creator.username}
                url={creator.url}
                image={creator.image}
                description={creator.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

