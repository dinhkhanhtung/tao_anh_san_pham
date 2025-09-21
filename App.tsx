
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Spinner } from './components/Spinner';
import { generateImageWithRetry } from './services/geminiService';
import { FileInfo } from './types';
import { DEFAULT_PROMPT } from './constants';
import { IconPhoto, IconSparkles } from './components/Icon';

const App: React.FC = () => {
  const [characterImage, setCharacterImage] = useState<FileInfo | null>(null);
  const [productImage, setProductImage] = useState<FileInfo | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneration = useCallback(async () => {
    if (!characterImage || !productImage) {
      setError('Vui lòng tải lên cả hai hình ảnh nhân vật và sản phẩm.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    const promptToUse = customPrompt.trim() === '' ? DEFAULT_PROMPT : customPrompt;

    try {
      const resultBase64 = await generateImageWithRetry(characterImage, productImage, promptToUse);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [characterImage, productImage, customPrompt]);

  const canGenerate = characterImage !== null && productImage !== null && !isLoading;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-600 dark:text-primary-400">
            Trình tạo hình ảnh sản phẩm AI
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Tạo hình ảnh quảng cáo ấn tượng bằng cách kết hợp người mẫu và sản phẩm của bạn.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Tải lên hình ảnh</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUploader
                  title="Ảnh nhân vật"
                  onImageUpload={setCharacterImage}
                  fileInfo={characterImage}
                />
                <ImageUploader
                  title="Ảnh sản phẩm"
                  onImageUpload={setProductImage}
                  fileInfo={productImage}
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Nhập câu lệnh (tùy chọn)</h2>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Nhập câu lệnh của bạn ở đây, hoặc để trống để dùng mặc định..."
                className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200"
              />
            </div>
            <button
              onClick={handleGeneration}
              disabled={!canGenerate}
              className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <IconSparkles />
                  Tạo ảnh
                </>
              )}
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center min-h-[400px] lg:min-h-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white self-start">Kết quả</h2>
            <div className="w-full h-full flex-grow flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              {isLoading && <Spinner size="lg" />}
              {error && <div className="text-red-500 p-4 text-center">{error}</div>}
              {generatedImage && !isLoading && !error && (
                <img src={generatedImage} alt="Generated result" className="w-full h-full object-contain" />
              )}
              {!isLoading && !error && !generatedImage && (
                <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                  <IconPhoto className="mx-auto h-16 w-16" />
                  <p className="mt-2">Hình ảnh được tạo sẽ xuất hiện ở đây.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
   