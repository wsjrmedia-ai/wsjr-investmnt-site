import { supabase } from './supabase';

/**
 * Uploads a file (File/Blob) or base64 image to Supabase Storage
 * @param {File | string} fileOrBase64 - File object, Blob, or base64 data URI
 * @param {string} bucket - Supabase storage bucket name
 * @returns {Promise<string|null>} - Public URL of uploaded image or null
 */
export async function uploadToStorage(fileOrBase64, bucket = 'misc-uploads') {
  try {
    if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('https')) {
      return fileOrBase64; // Already a URL
    }

    let fileBody;
    let fileExt = 'jpeg';
    let contentType = 'image/jpeg';

    if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:')) {
      // It's a base64 string
      const [header, base64Data] = fileOrBase64.split(',');
      const mime = header.split(';')[0].split(':')[1];
      fileExt = mime.split('/')[1] || 'jpeg';
      contentType = mime;
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      fileBody = bytes;
    } else if (fileOrBase64 instanceof File || fileOrBase64 instanceof Blob) {
      // It's a File or Blob object
      contentType = fileOrBase64.type || 'application/octet-stream';
      fileExt = contentType.split('/')[1] || 'bin';
      fileBody = await fileOrBase64.arrayBuffer();
    } else {
      console.error('Invalid file format provided for upload');
      return null;
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, fileBody, {
        contentType,
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase storage:', error);
    throw error;
  }
}
