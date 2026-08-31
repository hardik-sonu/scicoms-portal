'use client';

import React from 'react';
import { X, Calendar, Camera } from 'lucide-react';
import { GalleryItem } from '@/lib/data';

export default function LightboxModal({
  item,
  isOpen,
  onClose
}: {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-[#00113a] border border-white/10 rounded-sm overflow-hidden shadow-2xl text-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[70vh] w-auto object-contain"
          />
        </div>

        <div className="p-6 space-y-2 bg-[#00113a]">
          <div className="flex items-center gap-3 text-xs text-[#ffd700] font-mono">
            <span className="bg-[#002366] px-2.5 py-0.5 rounded-xs uppercase">{item.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
          </div>
          <h3 className="font-serif font-bold text-xl text-white">{item.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{item.caption}</p>
        </div>
      </div>
    </div>
  );
}
