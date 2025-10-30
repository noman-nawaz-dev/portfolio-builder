import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
  constructor() {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  /**
   * Upload a single image to Cloudinary after converting to WebP
   * @param file The uploaded file
   * @returns The Cloudinary secure URL
   */
  async uploadSingleImage(file: Express.Multer.File): Promise<string> {
    try {
      // Validate file type
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.',
        );
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new BadRequestException('File size must be less than 5MB');
      }

      // Convert image to WebP format for optimization
      const webpBuffer = await sharp(file.buffer)
        .webp({ quality: 85 }) // High quality WebP
        .toBuffer();

      // Upload to Cloudinary
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'portfolio-builder',
            format: 'webp',
            transformation: [
              { width: 1920, height: 1920, crop: 'limit' }, // Limit max dimensions
              { quality: 'auto:good' }, // Auto quality
              { fetch_format: 'auto' }, // Auto format
            ],
          },
          (error, result) => {
            if (error) {
              reject(new BadRequestException(`Upload failed: ${error.message}`));
            } else {
              resolve(result.secure_url);
            }
          },
        );

        uploadStream.end(webpBuffer);
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Image processing failed: ${error.message}`);
    }
  }

  /**
   * Upload multiple images to Cloudinary after converting to WebP
   * @param files Array of uploaded files
   * @returns Array of Cloudinary secure URLs
   */
  async uploadMultipleImages(files: Express.Multer.File[]): Promise<string[]> {
    try {
      // Validate number of files
      if (files.length > 10) {
        throw new BadRequestException('Maximum 10 images can be uploaded at once');
      }

      if (files.length === 0) {
        throw new BadRequestException('No files provided');
      }

      // Upload all files in parallel
      const uploadPromises = files.map((file) => this.uploadSingleImage(file));
      return await Promise.all(uploadPromises);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Multiple upload failed: ${error.message}`);
    }
  }

  /**
   * Delete an image from Cloudinary
   * @param imageUrl The Cloudinary URL to delete
   */
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Validate URL
      if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
        console.warn('Invalid Cloudinary URL provided for deletion');
        return;
      }

      // Extract public_id from URL
      // Example URL: https://res.cloudinary.com/cloud/image/upload/v123/portfolio-builder/abc.webp
      const urlParts = imageUrl.split('/');
      const uploadIndex = urlParts.findIndex(part => part === 'upload');
      
      if (uploadIndex === -1 || uploadIndex >= urlParts.length - 1) {
        console.warn('Unable to extract public_id from URL');
        return;
      }

      // Get everything after /upload/ (excluding version if present)
      const pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/');
      
      // Remove version prefix (v123456/) if present
      const pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, '');
      
      // Remove file extension
      const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, '');

      console.log(`Deleting image with public_id: ${publicId}`);
      
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result === 'ok') {
        console.log('Image deleted successfully from Cloudinary');
      } else {
        console.warn('Image deletion result:', result);
      }
    } catch (error) {
      // Log but don't throw - we don't want to block operations if delete fails
      console.error('Failed to delete image from Cloudinary:', error);
    }
  }
}
