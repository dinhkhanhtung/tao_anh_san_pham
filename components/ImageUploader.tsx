import React, { useRef, useState, useCallback } from 'react';
import { FileInfo } from '../types';
import { IconUpload, IconPlus, IconTrash, IconCheckCircle } from './Icon';

interface ImageUploaderProps {
  title: string;
  onImagesUpdate: (fileInfos: FileInfo[]) => void;
  onImageSelect: (fileInfo: FileInfo) => void;
  onImageDelete: (fileId: string) => void;
  files: FileInfo[];
  selectedFile: FileInfo | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  onImagesUpdate,
  onImageSelect,
  onImageDelete,
  files,
  selectedFile
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const filesToProcess = Array.from(fileList);

    const initialUploadStates: FileInfo[] = filesToProcess.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      name: file.name,
      base64: '',
      mimeType: file.type,
      status: 'uploading',
      progress: 0,
    }));

    onImagesUpdate(initialUploadStates);

    initialUploadStates.forEach((uploadState, index) => {
      const file = filesToProcess[index];
      const reader = new FileReader();

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          onImagesUpdate([{ ...uploadState, progress }]);
        }
      };

      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onImagesUpdate([{
          ...uploadState,
          base64,
          progress: 100,
          status: 'success',
        }]);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        // Here you could update the status to 'error'
      };

      reader.readAsDataURL(file);
    });

  }, [onImagesUpdate]);

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleDelete = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    onImageDelete(fileId);
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => file.base64 && onImageSelect(file)}
            className={`relative group aspect-square rounded-lg overflow-hidden transition-all duration-300 transform
              ${file.base64 ? 'cursor-pointer' : 'cursor-default'}
              ${selectedFile?.id === file.id ? 'ring-4 ring-primary-500 scale-105' : 'ring-2 ring-transparent hover:ring-primary-300 hover:scale-105'}`}
          >
            {file.status === 'uploading' || !file.base64 ? (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center p-2 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-300 break-words w-full truncate">{file.name}</p>
                <div className="w-10/12 bg-gray-400 dark:bg-gray-600 rounded-full h-1.5 mt-2">
                  <div className="bg-primary-500 h-1.5 rounded-full transition-all duration-150" style={{ width: `${file.progress || 0}%` }}></div>
                </div>
              </div>
            ) : (
              <>
                <img src={file.base64} alt={file.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200"></div>
                <button
                  onClick={(e) => handleDelete(e, file.id)}
                  className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                  aria-label={`Xóa ảnh ${file.name}`}
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </>
            )}
             {file.status === 'success' && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-70 flex items-center justify-center z-10 animate-scale-in">
                    <IconCheckCircle className="w-8 h-8 text-white" />
                </div>
            )}
          </div>
        ))}
        <label
          htmlFor={`dropzone-file-${title}`}
          onClick={triggerFileInput}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
            ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        >
          <div className="flex flex-col items-center justify-center text-center">
             {files.length === 0 ? (
                <>
                  <IconUpload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 px-1">Kéo thả hoặc nhấn để tải lên</p>
                </>
             ) : (
                <IconPlus className="w-8 h-8 text-gray-400" />
             )}
          </div>
          <input
            ref={fileInputRef}
            id={`dropzone-file-${title}`}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
};