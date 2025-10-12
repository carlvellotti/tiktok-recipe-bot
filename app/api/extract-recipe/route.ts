import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface TikTokAPIResponse {
  code: number;
  msg: string;
  data: {
    title: string;
    play: string;
    wmplay: string;
    hdplay: string;
    cover: string;
    duration: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'TikTok URL is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Step 1: Fetch TikTok video data using tikwm API
    console.log('Fetching TikTok video data...');
    const tiktokResponse = await axios.post<TikTokAPIResponse>(
      'https://www.tikwm.com/api/',
      {
        url: url,
        hd: 1
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (tiktokResponse.data.code !== 0) {
      return NextResponse.json(
        { error: 'Failed to fetch TikTok video. Please check the URL.' },
        { status: 400 }
      );
    }

    const videoData = tiktokResponse.data.data;
    const videoUrl = videoData.hdplay || videoData.play;
    const caption = videoData.title || '';
    const coverImage = videoData.cover || '';

    console.log('Video fetched successfully');
    console.log('Caption:', caption);
    console.log('Cover image:', coverImage);

    // Step 2: Download the video as a buffer
    console.log('Downloading video...');
    const videoResponse = await axios.get(videoUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const videoBuffer = Buffer.from(videoResponse.data);
    console.log(`Video downloaded: ${videoBuffer.length} bytes`);

    // Step 3: Upload video to Gemini File API
    console.log('Uploading video to Gemini...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-09-2025' });

    // Convert buffer to base64 for inline data
    const videoBase64 = videoBuffer.toString('base64');

    // Step 4: Generate recipe using Gemini with video and caption
    console.log('Analyzing video with Gemini...');
    const prompt = `You are a professional recipe writer. Analyze this cooking video and extract a complete, well-formatted recipe.

${caption ? `Video Caption/Description: "${caption}"` : ''}

Please watch the video carefully and extract:
1. Recipe Title (create an appetizing name if not explicitly stated)
2. Brief Description (1-2 sentences about the dish)
3. Complete list of Ingredients (with measurements if visible)
4. Step-by-step Instructions (clear and detailed)
5. Cooking Time (estimate if not stated)
6. Servings (estimate if not stated)

Format your response as a JSON object with this exact structure:
{
  "title": "Recipe Name",
  "description": "Brief description of the dish",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "instructions": ["step 1", "step 2", ...],
  "cookTime": "X minutes",
  "servings": "X servings"
}

Important formatting rules:
- Be thorough and detailed
- Include ALL ingredients you see in the video
- Write clear instructions in the order shown
- In the instructions, whenever you mention an ingredient, format it as: <strong>ingredient name</strong> (amount)
  Example: "Add <strong>olive oil</strong> (2 tablespoons) to the pan"
- If an ingredient amount was already mentioned or is obvious from context, you can omit the amount
- If you cannot determine something, make a reasonable estimate based on what you see
- ONLY respond with the JSON object, no other text`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: videoBase64,
          mimeType: 'video/mp4',
        },
      },
      { text: prompt },
    ]);

    const response = result.response;
    const text = response.text();
    
    console.log('Gemini response received');
    console.log('Raw response:', text);

    // Parse the JSON response
    let recipe;
    try {
      // Remove markdown code blocks if present
      const cleanedText = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      recipe = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      console.error('Raw text:', text);
      
      // Fallback: try to extract recipe from text
      return NextResponse.json(
        { 
          error: 'Failed to parse recipe from AI response',
          details: text 
        },
        { status: 500 }
      );
    }

    // Validate recipe structure
    if (!recipe.title || !recipe.ingredients || !recipe.instructions) {
      return NextResponse.json(
        { error: 'Incomplete recipe data received from AI' },
        { status: 500 }
      );
    }

    console.log('Recipe extracted successfully');
    return NextResponse.json({ 
      recipe: {
        ...recipe,
        coverImage: coverImage
      }
    });

  } catch (error) {
    console.error('Error processing request:', error);
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { 
          error: 'Failed to fetch video data',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

