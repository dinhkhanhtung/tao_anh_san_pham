
import { GoogleGenAI, Modality } from "@google/genai";
import { FileInfo } from '../types';

const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 1000;

// This should be securely managed, e.g., via environment variables
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY is not defined. Please set it in your environment variables.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.models['gemini-2.5-flash-image-preview'];

const generateImage = async (characterImage: FileInfo, productImage: FileInfo, prompt: string): Promise<string> => {
    const characterImagePart = {
        inlineData: {
            data: characterImage.base64.split(',')[1],
            mimeType: characterImage.mimeType,
        },
    };

    const productImagePart = {
        inlineData: {
            data: productImage.base64.split(',')[1],
            mimeType: productImage.mimeType,
        },
    };

    const textPart = {
        text: prompt,
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
            parts: [characterImagePart, productImagePart, textPart],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }

    throw new Error("API không trả về hình ảnh. Phản hồi của mô hình có thể đã bị chặn hoặc không chứa dữ liệu hình ảnh.");
};


export const generateImageWithRetry = async (characterImage: FileInfo, productImage: FileInfo, prompt: string): Promise<string> => {
    let attempts = 0;
    let delay = INITIAL_DELAY_MS;

    while (attempts < MAX_RETRIES) {
        try {
            return await generateImage(characterImage, productImage, prompt);
        } catch (error: any) {
            attempts++;
            if (attempts >= MAX_RETRIES) {
                throw new Error(`Đã đạt đến số lần thử lại tối đa. Lỗi cuối cùng: ${error.message}`);
            }

            // Check for specific retryable errors, e.g., 429 Too Many Requests
            const isRetryable = error?.status === 429 || error?.message?.includes('429');
            
            if (isRetryable) {
                console.warn(`Attempt ${attempts} failed. Retrying in ${delay}ms...`);
                await new Promise(res => setTimeout(res, delay));
                delay *= 2; // Exponential backoff
            } else {
                // For non-retryable errors, fail fast
                throw error;
            }
        }
    }
    // This line should not be reachable, but is here for type safety
    throw new Error("Đã xảy ra lỗi không xác định sau khi thử lại.");
};
   