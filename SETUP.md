# Quick Setup Guide 🚀

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your new API key

## Step 3: Add Your API Key

Open the `.env.local` file (it's already created) and add your key:

```
GEMINI_API_KEY=your_actual_api_key_here
```

## Step 4: Run the App

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Step 5: Test It!

Try with the test video: https://www.tiktok.com/t/ZTMUFa9Mt/

---

## Deploy to Vercel (Optional)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable: `GEMINI_API_KEY` with your API key
6. Click "Deploy"

Done! 🎉

---

## Troubleshooting

### "GEMINI_API_KEY is not configured"
- Make sure you've added your API key to `.env.local`
- Restart the dev server after adding the key

### "Failed to fetch TikTok video"
- Check that the TikTok URL is valid
- Try a different video URL
- Some videos may be region-restricted

### Video takes too long to process
- TikTok videos can be large
- First request may take 30-60 seconds
- Gemini needs to analyze the entire video

### Module not found errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then run `npm install`

---

Need help? Check the [README.md](./README.md) for more details!

