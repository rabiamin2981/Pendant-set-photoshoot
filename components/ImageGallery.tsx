
import React from 'react';
import { GeneratedImage } from '../types';
import { IMAGE_CATEGORIES } from '../constants';
import Loader from './Loader';

interface ImageGalleryProps {
  images: GeneratedImage[];
  isLoading: boolean;
}

const ImageCard: React.FC<{ image: GeneratedImage }> = ({ image }) => (
  <div className="group relative overflow-hidden rounded-lg bg-gray-800 shadow-xl shadow-black/40 transition-transform duration-300 hover:scale-105">
    <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-lg font-bold text-white">{image.title}</h3>
      <p className="text-sm text-gray-300">{image.description}</p>
    </div>
  </div>
);

const SkeletonCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="rounded-lg bg-gray-800 shadow-lg flex flex-col items-center justify-center p-4 aspect-square animate-pulse">
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Loader />
      <h3 className="text-lg font-bold text-gray-500 mt-4">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  </div>
);

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {IMAGE_CATEGORIES.map(category => (
          <SkeletonCard key={category.id} title={category.title} description={category.description} />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {IMAGE_CATEGORIES.map(category => (
          <div key={category.id} className="rounded-lg bg-gray-800/50 flex flex-col items-center justify-center p-4 aspect-square border border-dashed border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
            </svg>
            <h3 className="text-lg font-bold text-gray-500">{category.title}</h3>
            <p className="text-sm text-gray-600 text-center">{category.description}</p>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {images.map(image => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGallery;
