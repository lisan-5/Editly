'use client';

import { useState } from 'react';
import { Wand2 } from 'lucide-react';

interface EditorInterfaceProps {
    onGenerate: (prompt: string) => void;
    isGenerating: boolean;
    disabled: boolean;
}

export default function EditorInterface({ onGenerate, isGenerating, disabled }: EditorInterfaceProps) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !disabled) {
            onGenerate(prompt);
        }
    };

    return (
        <div className="w-full space-y-4 mt-8">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your edit (e.g., 'Make it snowy', 'Add a red hat')..."
                    disabled={disabled || isGenerating}
                    className="input-field flex-1"
                />
                <button
                    type="submit"
                    disabled={disabled || isGenerating || !prompt.trim()}
                    className="btn-primary flex items-center justify-center gap-2 min-w-[140px]"
                >
                    {isGenerating ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing</span>
                        </>
                    ) : (
                        <>
                            <Wand2 size={20} />
                            <span>Generate</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
