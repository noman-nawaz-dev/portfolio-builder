'use client';

import { useState, useRef, useEffect } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  multiple = false,
  maxFiles = 1,
  className = '',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(value || '');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync internal state with prop value
  useEffect(() => {
    setPreviewUrl(value || '');
  }, [value]);

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPEG, PNG, GIF, and WebP images are allowed';
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError('');

    // Validate number of files
    if (files.length > maxFiles) {
      setError(`Maximum ${maxFiles} ${maxFiles === 1 ? 'file' : 'files'} allowed`);
      return;
    }

    // Validate each file
    for (let i = 0; i < files.length; i++) {
      const validationError = validateFile(files[i]);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // If replacing an existing image, delete the old one from Cloudinary
    if (previewUrl && previewUrl.includes('cloudinary.com')) {
      try {
        await fetch('http://localhost:4000/upload/delete', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: previewUrl }),
        });
      } catch (err) {
        console.error('Error deleting old image:', err);
        // Continue with upload anyway
      }
    }

    // Show preview for single image
    if (!multiple && files.length === 1) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }

    // Upload file(s)
    await uploadFiles(files);
  };

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      
      if (multiple) {
        // Multiple files upload
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }

        const response = await fetch('http://localhost:4000/upload/multiple', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Upload failed');
        }

        const data = await response.json();
        // For multiple uploads, join URLs with comma
        onChange(data.urls.join(','));
        setPreviewUrl(data.urls[0]); // Show first image as preview
      } else {
        // Single file upload
        formData.append('image', files[0]);

        const response = await fetch('http://localhost:4000/upload/single', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Upload failed');
        }

        const data = await response.json();
        onChange(data.url);
        setPreviewUrl(data.url);
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.');
      setPreviewUrl('');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    setError('');

    // If there's a Cloudinary URL, delete it from Cloudinary
    if (previewUrl && previewUrl.includes('cloudinary.com')) {
      try {
        const response = await fetch('http://localhost:4000/upload/delete', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: previewUrl }),
        });

        if (!response.ok) {
          console.error('Failed to delete image from Cloudinary');
          // Continue anyway to remove from frontend
        } else {
          console.log('Image deleted from Cloudinary successfully');
        }
      } catch (err) {
        console.error('Error deleting image:', err);
        // Continue anyway to remove from frontend
      }
    }

    // Clear the preview and value regardless of Cloudinary deletion result
    setPreviewUrl('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setRemoving(false);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {multiple && maxFiles > 1 && (
          <span className="text-gray-500 text-xs ml-2">
            (Max {maxFiles} images)
          </span>
        )}
      </label>

      <div className="space-y-3">
        {/* Preview */}
        {previewUrl && (
          <div className="relative inline-block">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-w-xs h-48 object-cover rounded-lg border-2 border-gray-200"
            />
            
            {/* Removing Loader Overlay */}
            {removing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-white mb-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-white font-semibold text-lg">Removing...</span>
              </div>
            )}
            
            <button
              type="button"
              onClick={handleRemove}
              disabled={removing}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              title="Remove image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            multiple={multiple}
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id={`file-upload-${label.replace(/\s/g, '-')}`}
          />
          <label
            htmlFor={`file-upload-${label.replace(/\s/g, '-')}`}
            className={`flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition cursor-pointer ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              {uploading ? 'Uploading...' : previewUrl ? 'Change Image' : 'Choose Image'}
            </span>
          </label>

          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Full Size
            </a>
          )}
        </div>

        {/* Helper Text */}
        <p className="text-xs text-gray-500">
          Accepted formats: JPEG, PNG, GIF, WebP • Max size: 5MB
          {multiple && ` • Max files: ${maxFiles}`}
        </p>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {uploading && (
          <div className="flex items-center gap-2 text-indigo-600">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm font-medium">Uploading and optimizing image...</span>
          </div>
        )}
      </div>
    </div>
  );
}
