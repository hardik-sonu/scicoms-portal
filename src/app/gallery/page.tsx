'use client';

import React, { useState } from 'react';
import LightboxModal from '@/components/LightboxModal';
import { GALLERY_DATA, GalleryItem } from '@/lib/data';
import { Image as ImageIcon, Calendar, Eye } from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Annual Gala', 'Workshops', 'Science Expo', 'Guest Lectures', 'Lab Tours'];

  const filteredItems = GALLERY_DATA.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Visual Archives
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Photo & Media Gallery
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          High-resolution visual memories of science expos, hands-on metallurgy workshops, foreign guest lectures, and annual shields ceremonies.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xs text-xs font-bold transition-colors ${
              selectedCategory === cat
                ? 'bg-[#002366] text-white'
                : 'bg-white border border-[#00113a]/15 text-[#444650] hover:bg-[#eff4ff]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative h-64 bg-slate-900 rounded-sm overflow-hidden border border-[#00113a]/10 cursor-pointer shadow-xs hover:shadow-md transition-all"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-white space-y-1">
              <span className="text-[10px] text-[#ffd700] uppercase font-mono font-bold">
                {item.category} • {item.date}
              </span>
              <h3 className="font-serif font-bold text-sm text-white line-clamp-1">{item.title}</h3>
              <p className="text-[11px] text-slate-300 line-clamp-2">{item.caption}</p>
            </div>
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-xs p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
