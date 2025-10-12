# 🍳 TikTok Recipe Extractor

A beautiful web app that extracts recipes from TikTok cooking videos using Google Gemini 2.5 Pro's video understanding capabilities.

## ✨ Features

- 📱 Simple, intuitive interface for pasting TikTok URLs
- 🎥 Processes video content AND captions
- 🤖 AI-powered recipe extraction using Gemini 2.5 Pro
- 📝 Beautiful, formatted recipe output
- 🌓 Dark mode support
- ⚡ Fast serverless processing on Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google AI Studio API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tiktok-recipe-bot
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your Gemini API key
GEMINI_API_KEY=your_actual_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Testing

Try it with this sample TikTok cooking video:
- https://www.tiktok.com/t/ZTMUFa9Mt/

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.5 Pro (gemini-2.5-pro-preview-06-05)
- **Deployment**: Vercel

## 🏗️ How It Works

1. User pastes a TikTok video URL
2. Backend fetches the video and caption using TikWM API
3. Video is sent to Gemini 2.5 Pro for analysis
4. AI watches the video and extracts:
   - Recipe title
   - Description
   - Ingredients with measurements
   - Step-by-step instructions
   - Cook time and servings
5. Formatted recipe is displayed to the user

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Manual Deployment

1. Push your code to GitHub

2. Import your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. Add environment variables:
   - Go to Project Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key

4. Deploy!

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google AI Studio API key | Yes |

Get your Gemini API key from: https://aistudio.google.com/app/apikey

## 🎨 Features

- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Real-time loading states
- ✅ Error handling and validation
- ✅ Dark mode support
- ✅ Mobile-friendly design
- ✅ No database required (stateless)

## 📝 API Endpoints

### POST `/api/extract-recipe`

Extracts a recipe from a TikTok video URL.

**Request Body:**
```json
{
  "url": "https://www.tiktok.com/@username/video/..."
}
```

**Response:**
```json
{
  "recipe": {
    "title": "Delicious Pasta",
    "description": "A quick and easy pasta dish",
    "ingredients": ["pasta", "olive oil", "garlic"],
    "instructions": ["Boil water", "Cook pasta", "Add garlic"],
    "cookTime": "15 minutes",
    "servings": "2 servings"
  }
}
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

MIT

## 🙏 Credits

- Powered by [Google Gemini 2.5 Pro](https://deepmind.google/technologies/gemini/)
- TikTok video data from [TikWM API](https://www.tikwm.com/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ for cooking enthusiasts

