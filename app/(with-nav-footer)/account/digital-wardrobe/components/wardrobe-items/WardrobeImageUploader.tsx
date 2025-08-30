import React, { useCallback, useState } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import useImageUpload from "hooks/useImageUpload";
import { ImageComponent } from "components/image-component/ImageComponent";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

interface WardrobeImageUploaderProps {
  onImagesChange: (imageUrls: string[]) => void;
  maxSizeInMB?: number;
  label?: string;
  initialImages?: string[];
  error?: string;
}

const WardrobeImageUploader: React.FC<WardrobeImageUploaderProps> = (props) => {
  const {
    onImagesChange,
    maxSizeInMB = 5,
    label = "Product Images",
    initialImages = [],
    error,
  } = props;

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(() => {
    return initialImages.map((url, index) => ({
      id: `initial-${index}`,
      url,
      file: new File([], `image-${index}`),
    }));
  });

  const [currentUploadingFile, setCurrentUploadingFile] = useState<File | null>(
    null,
  );
  const { uploadImage, progress, isUploading } = useImageUpload();
  const maxSize = maxSizeInMB * 1024 * 1024;

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleImageUpload = async (files: File[]) => {
    for (const file of files) {
      const imageId = generateId();

      try {
        // Create preview immediately
        const tempImage: UploadedImage = {
          id: imageId,
          url: URL.createObjectURL(file),
          file,
        };

        setUploadedImages((prev) => [...prev, tempImage]);
        setCurrentUploadingFile(file);

        // Upload the file
        const result = await uploadImage.mutateAsync(file);

        if (result) {
          // Replace preview with actual URL
          setUploadedImages((prev) => {
            const updated = prev.map((img) =>
              img.id === imageId ? { ...img, url: result } : img,
            );

            updateParentImages(updated);
            return updated;
          });
        }
      } catch (error) {
        // Remove failed upload
        setUploadedImages((prev) => {
          const updated = prev.filter((img) => img.id !== imageId);
          updateParentImages(updated);
          return updated;
        });
        console.error("Failed to upload image:", error);
      } finally {
        setCurrentUploadingFile(null);
      }
    }
  };

  const updateParentImages = (images: UploadedImage[]) => {
    const imageUrls = images.map((img) => img.url);

    onImagesChange(imageUrls);
  };

  const removeImage = (id: string) => {
    setUploadedImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      updateParentImages(updated);
      return updated;
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        console.warn("Some files were rejected:", rejectedFiles);
        return;
      }

      if (acceptedFiles.length > 0) {
        handleImageUpload(acceptedFiles);
      }
    },
    [],
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: true,
    maxSize,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  return (
    <div className="w-full space-y-3">
      {label && (
        <label className={`text-secondary-700 mb-1 text-sm`}>{label}</label>
      )}

      <div className="grid grid-cols-5 gap-2">
        {/* Existing Images */}
        {uploadedImages.map((image, index) => {
          const isThisImageUploading =
            isUploading && currentUploadingFile === image.file;

          return (
            <div
              key={image.id}
              className="group relative aspect-3/4 overflow-hidden rounded-lg bg-blue-100"
            >
              <Zoom
                zoomImg={{
                  src: image.url,
                  alt: "Zoomed virtual try-on image",
                }}
              >
                <ImageComponent
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  className="object-cover"
                  fill
                />
              </Zoom>

              {/* Loading Overlay - Only for the currently uploading image */}
              {isThisImageUploading && (
                <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black/60">
                  <div className="text-center">
                    <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span className="text-xs text-white">{progress}%</span>
                  </div>
                </div>
              )}

              {/* Remove Button - Hide during upload */}
              {!isThisImageUploading && (
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="bg-opacity-90 hover:bg-opacity-100 absolute top-0.5 right-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-opacity"
                >
                  <svg
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          );
        })}

        {/* Upload Slot */}
        <div
          {...getRootProps()}
          className={`flex aspect-3/4 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-100 transition-all hover:border-gray-400 hover:bg-gray-50 ${
            isDragActive ? "border-blue-400 bg-blue-50" : ""
          }`}
        >
          <input {...getInputProps()} />

          {/* Cloud Upload Icon */}
          <svg
            className="mb-2 h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3 3m0 0l3-3m-3 3V9"
            />
          </svg>

          <span className="text-xs font-medium text-gray-500">Upload</span>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default WardrobeImageUploader;
