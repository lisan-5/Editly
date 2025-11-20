'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import EditorInterface from '@/components/EditorInterface';
import ResultDisplay from '@/components/ResultDisplay';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageSelect = (file: File | null) => {
    setOriginalImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalImageUrl(url);
      setResultImageUrl(null); // Reset result when new image is picked
    } else {
      setOriginalImageUrl(null);
      setResultImageUrl(null);
    }
  };

  const handleGenerate = async (prompt: string) => {
    if (!originalImage) return;

    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append('image', originalImage);
      formData.append('prompt', prompt);

      const response = await fetch('/api/edit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      if (data.url) {
        setResultImageUrl(data.url);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setResultImageUrl(null);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center py-20 px-4 relative overflow-hidden selection:bg-primary/30">
      {/* Ambient Glow & Floating Shapes */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[15%] w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] animate-float" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 animate-in space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 hover:bg-white/10 transition-colors cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">AI Powered 2.0</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
            <span className="text-gradient inline-block transform hover:scale-105 transition-transform duration-500 cursor-default drop-shadow-2xl">
              Editly
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Reimagine your photos with the world's most advanced <span className="text-primary font-medium">AI editor</span>. Just describe it, and watch the magic happen.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 animate-in delay-100 backdrop-blur-2xl border border-white/10 shadow-2xl ring-1 ring-white/5">
          {!resultImageUrl ? (
            <div className="max-w-2xl mx-auto space-y-10">
              <ImageUploader onImageSelect={handleImageSelect} />

              {originalImage && (
                <div className="animate-in delay-200">
                  <EditorInterface
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    disabled={!originalImage}
                  />
                </div>
              )}
            </div>
          ) : (
            <ResultDisplay
              originalImage={originalImageUrl!}
              resultImage={resultImageUrl}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </main>
  );
}
