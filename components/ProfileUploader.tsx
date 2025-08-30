// ImageUploader.tsx
import useImageUpload from "hooks/useImageUpload";
import React, { useState, useCallback } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { Button } from "./Button";
import { ImageComponent } from "./image-component/ImageComponent";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  maxSizeInMB?: number;
  label?: string;
}

const ProfileUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  maxSizeInMB = 5, // Default 5MB max size
  label,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [confirmationMode, setConfirmationMode] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const { uploadImage, progress, isUploading } = useImageUpload();

  const maxSize = maxSizeInMB * 1024 * 1024; // Convert MB to bytes

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Reset error state
      setFileError(null);

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const { errors } = rejectedFiles[0];
        if (errors.some((e) => e.code === "file-too-large")) {
          setFileError(`File is too large. Max size is ${maxSizeInMB}MB.`);
        } else if (errors.some((e) => e.code === "file-invalid-type")) {
          setFileError("Invalid file type. Only images are accepted.");
        } else {
          setFileError("Error uploading file. Please try again.");
        }
        return;
      }

      // Handle accepted files
      if (acceptedFiles?.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);

        // Create preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setConfirmationMode(true);
        setUploadComplete(false);
      }
    },
    [maxSizeInMB],
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  const handleDiscard = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setConfirmationMode(false);
    setUploadComplete(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Clean up
    }
  };

  const handleConfirm = async () => {
    if (selectedFile) {
      const result = await uploadImage.mutateAsync(selectedFile);

      if (result) {
        setUploadedImageUrl(result);
        setUploadComplete(true);
        onImageUploaded(result);

        // Clean up the object URL but keep confirmation mode true to show the avatar
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl("");
        }

        // Reset the selected file but keep the uploaded URL
        setSelectedFile(null);
      }
    }
  };

  const handleReplaceImage = () => {
    // Reset only the upload complete state but keep confirmation mode
    // This will return to the file selection screen
    setConfirmationMode(false);
    setUploadComplete(false);
  };

  return (
    <div className="mx-auto w-full">
      {label && (
        <div className="mb-1 flex items-center justify-between">
          <label className="text-secondary-700 text-sm font-normal">
            {label}
          </label>
        </div>
      )}
      {!confirmationMode ? (
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all ${
              isDragActive
                ? "border-primary-300 bg-blue-50"
                : "border-primary-200 hover:border-primary-300 hover:bg-primary-100"
            }`}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon className="mb-3 h-12 w-12 text-gray-400" />
            <p className="text-center font-medium text-gray-700">
              Drag and drop your image here, or click to select
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Supports: JPG, PNG, GIF, WEBP (Max: {maxSizeInMB}MB)
            </p>
          </div>

          {fileError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{fileError}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-primary-200 bg-white p-4">
          {!uploadComplete ? (
            <>
              <div className="mb-4">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded bg-neutral-50">
                  <ImageComponent
                    width={200}
                    height={200}
                    src={previewUrl}
                    alt="Preview"
                    className="h-full max-h-36 w-full object-contain"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {selectedFile?.name} (
                  {selectedFile &&
                    (selectedFile?.size / 1024 / 1024).toFixed(2)}{" "}
                  MB)
                </p>
              </div>

              {isUploading ? (
                <div className="flex flex-col items-center justify-center py-3">
                  <div className="relative h-16 w-16">
                    <svg
                      className="h-16 w-16 animate-spin text-primary-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-800">
                        {progress}%
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Uploading image...
                  </p>
                </div>
              ) : (
                <div className="mt-3 flex justify-end gap-x-2">
                  <Button onClick={handleDiscard} variant="ghost" size="md">
                    Discard
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    size="md"
                    endIcon={<CheckCircleIcon className="h-4 w-4" />}
                  >
                    Confirm Upload
                  </Button>
                </div>
              )}
            </>
          ) : (
            // Show uploaded image as rounded avatar after successful upload
            <div className="flex flex-col items-center justify-center py-3">
              <div className="mb-3 text-center">
                <p className="text-lg font-medium text-gray-800">
                  Upload Complete!
                </p>
                <p className="text-sm text-gray-600">
                  Your image has been successfully uploaded
                </p>
              </div>

              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-primary-200">
                <ImageComponent
                  width={96}
                  height={96}
                  src={uploadedImageUrl}
                  alt="Uploaded Avatar"
                  className="h-full w-full object-cover"
                />
              </div>

              <Button
                onClick={handleReplaceImage}
                size="md"
                variant="outline"
                endIcon={<UploadNewIcon className="h-4 w-4" />}
              >
                Replace Image
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface IconProps {
  className?: string;
}

const CloudUploadIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const CheckCircleIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const UploadNewIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
    />
  </svg>
);

export default ProfileUploader;
