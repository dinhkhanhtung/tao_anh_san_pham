
import React, { useRef, useState, useCallback } from 'react';
import { FileInfo } from '../types';
import { IconUpload, IconFileCheck } from './Icon';

interface ImageUploaderProps {
  title: string;
  onImageUpload: (fileInfo: FileInfo | null) => void;
  fileInfo: FileInfo | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onImageUpload, fileInfo }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onImageUpload({
          name: file.name,
          base64,
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor={`dropzone-file-${title}`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
          ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-2">
          {fileInfo ? (
            <>
              <IconFileCheck className="w-10 h-10 mb-3 text-green-500" />
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 break-all">{fileInfo.name}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent label click
                  onImageUpload(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="mt-2 text-xs text-red-500 hover:underline"
              >
                Xóa
              </button>
            </>
          ) : (
            <>
              <IconUpload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">{title}</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          id={`dropzone-file-${title}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </label>
    </div>
  );
};
   