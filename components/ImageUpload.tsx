
import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  originalImage: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, originalImage }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       onImageUpload(file);
       const reader = new FileReader();
       reader.onloadend = () => {
         setPreview(reader.result as string);
       };
       reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <div className="w-full">
      <div 
        onClick={handleBoxClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center text-gray-400 cursor-pointer hover:border-purple-500 hover:text-purple-400 transition-colors bg-gray-800/50"
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          <img src={preview} alt="Jewelry preview" className="max-h-full max-w-full object-contain rounded-md" />
        ) : (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2">Drag & drop an image or click to upload</p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP recommended</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
