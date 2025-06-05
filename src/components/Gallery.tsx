
import React, { useState } from 'react';
import { X } from 'lucide-react';

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    {
      src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop",
      title: "Tech Conference 2023",
      category: "Events"
    },
    {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      title: "Team Building Workshop",
      category: "Team"
    },
    {
      src: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop",
      title: "Hackathon Victory",
      category: "Achievement"
    },
    {
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      title: "Code Review Session",
      category: "Work"
    },
    {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
      title: "Innovation Lab",
      category: "Projects"
    },
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
      title: "Mentoring Session",
      category: "Teaching"
    }
  ];

  return (
    <section id="gallery" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Photo <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Gallery</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedImage(item.src)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={selectedImage}
                alt="Gallery item"
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
