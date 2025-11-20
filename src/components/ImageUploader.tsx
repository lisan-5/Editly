'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
    onImageSelect: (file: File | null) => void;
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const pngFile = new File([blob], 'image.png', { type: 'image/png' });
                            setPreview(canvas.toDataURL('image/png'));
                            onImageSelect(pngFile);
                        }
                    }, 'image/png');
                }
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        setPreview(null);
        onImageSelect(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            {!preview ? (
                <div
                    className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 text-center cursor-pointer group
            ${dragActive
                            ? 'border-primary bg-primary/10 scale-[1.02]'
                            : 'border-white/10 hover:border-primary/50 hover:bg-white/5'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                    />

                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="p-6 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-lg">
                            <Upload size={40} className="text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                                Click or drag image to upload
                            </p>
                            <p className="text-sm text-gray-400">
                                Supports JPG, PNG, WEBP
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 shadow-2xl group">
                    <button
                        onClick={clearImage}
                        className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-red-500/80 text-white transition-all z-10 backdrop-blur-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    >
                        <X size={20} />
                    </button>
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-auto max-h-[600px] object-contain mx-auto"
                    />
                </div>
            )}
        </div>
    );
}
