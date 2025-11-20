import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        const openai = new OpenAI({ apiKey });

        const formData = await request.formData();
        const image = formData.get('image') as File;
        const prompt = formData.get('prompt') as string;

        if (!image || !prompt) {
            return NextResponse.json(
                { error: 'Image and prompt are required' },
                { status: 400 }
            );
        }

        // OpenAI expects a File object, but we might need to convert it depending on the environment
        // In Next.js App Router, formData.get('image') returns a File which works with OpenAI SDK v4

        const response = await openai.images.edit({
            image: image,
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        const url = response.data?.[0]?.url;
        if (!url) {
            throw new Error('No image URL returned from OpenAI');
        }

        return NextResponse.json({ url });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to process image' },
            { status: 500 }
        );
    }
}
