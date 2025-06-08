
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { portfolioData } = usePortfolio();
  
  // Safe access to gallery with fallback
  const gallery = portfolioData?.gallery || [];

  return (
    <section id="gallery" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black animate-fade-in">
          Photo <span className="bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">Gallery</span>
        </h2>
        
        {gallery.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-fade-in border border-gray-200"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedImage(item.src)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.category}</p>
                  </div>
                </div>
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-black/20 rounded-lg transition-all duration-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No gallery items added yet. Use the dashboard to add photos!</p>
          </div>
        )}
        
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] animate-scale-in">
              <img
                src={selectedImage}
                alt="Gallery item"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-black/70 rounded-full hover:bg-black transition-colors duration-300 hover:scale-110 transform"
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
