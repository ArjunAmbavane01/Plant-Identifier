import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

function stripMarkdown(text: string): string {
  // Remove code block formatting
  text = text.replace(/```json\s?|```\s?/g, '');
  // Remove any remaining markdown syntax if present
  text = text.replace(/[\*\#\-\_\`]/g, '');
  return text.trim();
}

function parseAIResponse(text: string): any {
  const strippedText = stripMarkdown(text);
  try {
    return JSON.parse(strippedText);
  } catch (error) {
    console.error('Failed to parse JSON:', strippedText);
    // If parsing fails return a object with raw text 
    return {
      commonName: 'Unknown',
      scientificName: 'Unknown',
      family: 'Unknown',
      nativeRegion: 'Unknown',
      description: text,
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    const buffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      throw new Error('GOOGLE_GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: imageFile.type,
        },
      },
    ];

    const result = await model.generateContent([
      'Identify this plant and provide the following information in a JSON format: common name, scientific name, family, native region, and a brief description.',
      ...imageParts,
    ]);

    const plantInfo = parseAIResponse(result.response.text());

    return NextResponse.json({ result: plantInfo });
  } catch (error) {
    console.error('Error in /api/gemini:', error);
    return NextResponse.json({ error: 'Error identifying plant: ' + (error as Error).message }, { status: 500 });
  }
}
