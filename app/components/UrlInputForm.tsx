'use client';

export interface UrlInputFormProps {
  value: string;
  onChange: (value: string) => void;
  onPaste?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function UrlInputForm({
  value,
  onChange,
  onPaste,
  disabled = false,
  autoFocus = false
}: UrlInputFormProps) {
  return (
    <div>
      <label htmlFor="url" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
        tiktok video url
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://www.tiktok.com/@username/video/..."
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
          required
          disabled={disabled}
          autoFocus={autoFocus}
        />
        {onPaste && (
          <button
            type="button"
            onClick={onPaste}
            disabled={disabled}
            className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            title="Paste from clipboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="hidden sm:inline">paste</span>
          </button>
        )}
      </div>
    </div>
  );
}
