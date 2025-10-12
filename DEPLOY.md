# 🚀 Deployment Instructions

## ✅ GitHub Repository Created!

Your code is now live at: **https://github.com/carlvellotti/tiktok-recipe-bot**

## 📦 Deploy to Vercel (2 Options)

### Option 1: Web Interface (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"New Project"**
4. Select the repository: **carlvellotti/tiktok-recipe-bot**
5. Vercel will auto-detect Next.js - leave all settings as default
6. **Add Environment Variable:**
   - Click "Environment Variables"
   - Name: `GEMINI_API_KEY`
   - Value: (paste your Gemini API key)
   - Click "Add"
7. Click **"Deploy"**
8. Wait 2-3 minutes ☕
9. You'll get a live URL like: `tiktok-recipe-bot.vercel.app`

### Option 2: Vercel CLI

If you have Vercel CLI installed:

```bash
npm i -g vercel
vercel login
vercel
```

Then follow the prompts and add your environment variable in the Vercel dashboard.

## 🔑 Environment Variables

Make sure to add this in Vercel:
- **GEMINI_API_KEY**: Your Google AI Studio API key

## 🎉 That's It!

Your TikTok Recipe Extractor will be live on Vercel with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deployments on git push
- ✅ Serverless functions for the API

---

**Need help?** Check the [Vercel Next.js deployment docs](https://vercel.com/docs/frameworks/nextjs)

