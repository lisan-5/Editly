'use client';

import { Download, RefreshCw } from 'lucide-react';

interface ResultDisplayProps {
    originalImage: string;
    resultImage: string;
    onReset: () => void;
}

export default function ResultDisplay({ originalImage, resultImage, onReset }: ResultDisplayProps) {
    const handleDownload = async () => {
        try {
            const response = await fetch(resultImage);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'edited-image.png';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div className="w-full space-y-8 animate-in delay-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Original */}
                <div className="space-y-3 group">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Original</h3>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 aspect-square shadow-lg transition-all duration-300 group-hover:border-white/20">
                        <img
                            src={originalImage}
                            alt="Original"
                            className="w-full h-full object-contain p-4"
                        />
                    </div>
                </div>

                {/* Result */}
                <div className="space-y-3 group">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Result</h3>
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                            AI Generated
                        </span>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden border-2 border-primary/50 bg-black/20 aspect-square shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(99,102,241,0.25)] group-hover:border-primary">
                        <img
                            src={resultImage}
                            alt="Edited Result"
                            className="w-full h-full object-contain p-4"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t border-white/10">
                <button
                    onClick={onReset}
                    className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2 font-medium"
                >
                    <RefreshCw size={18} />
                    <span>Start Over</span>
                </button>

                <button
                    onClick={handleDownload}
                    className="btn-primary flex items-center justify-center gap-2 min-w-[200px]"
                >
                    <Download size={18} />
                    <span>Download Result</span>
                </button>
            </div>
        </div>
    );
}
