export interface FileInfo {
  id: string;
  name: string;
  base64: string;
  mimeType: string;
  // UI state for upload progress
  status?: 'uploading' | 'success';
  progress?: number;
}
