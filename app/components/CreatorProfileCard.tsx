'use client';

export interface CreatorProfileCardProps {
  username: string;
  url: string;
  image: string;
  description: string;
}

export default function CreatorProfileCard({ username, url, image, description }: CreatorProfileCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden flex"
    >
      <div className="flex flex-col items-center p-6 text-center w-full">
        {/* Profile Image */}
        <div className="relative w-20 h-20 mb-4 flex-shrink-0">
          <img
            src={image}
            alt={`@${username}`}
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
          @{username}
        </p>
        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-grow">
          {description}
        </p>
        {/* View Profile Link */}
        <p className="text-sm text-pink-500 dark:text-pink-400 font-medium">
          view profile →
        </p>
      </div>
    </a>
  );
}
