'use client';

import { useState } from 'react';
import RecipeDisplay from './components/RecipeDisplay';
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
            <div>
              <label htmlFor="url" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                tiktok video url
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.tiktok.com/@username/video/..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                  required
                  disabled={loading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  disabled={loading}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                  title="Paste from clipboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="hidden sm:inline">paste</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  extracting recipe...
                </span>
              ) : (
                'extract recipe'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-300 text-sm">
                <strong>error:</strong> {error}
              </p>
            </div>
          )}
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
              <a
                key={creator.username}
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden flex"
              >
                <div className="flex flex-col items-center p-6 text-center w-full">
                  {/* Profile Image */}
                  <div className="relative w-20 h-20 mb-4 flex-shrink-0">
                    <img 
                      src={creator.image} 
                      alt={`@${creator.username}`}
                      className="w-full h-full rounded-full object-cover border-4 border-pink-500 group-hover:border-pink-600 transition-colors"
                    />
                    {/* TikTok Badge */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </div>
                  </div>
                  {/* Username */}
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors mb-1">
                    @{creator.username}
                  </p>
                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-grow">
                    {creator.description}
                  </p>
                  {/* View Profile Link */}
                  <p className="text-sm text-pink-500 dark:text-pink-400 font-medium">
                    view profile →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

