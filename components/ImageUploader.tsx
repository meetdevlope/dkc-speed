import useImageUpload from "hooks/useImageUpload";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { Button } from "./Button";
import { ImageComponent } from "./image-component/ImageComponent";
import Icon from "./icon/Icon";

interface MultiImageUploaderProps {
  onImagesUploaded: (imageUrls: string[]) => void;
  maxSizeInMB?: number;
  label?: string;
  multiple?: boolean;
  maxFiles?: number;
  addToExistingOnly?: boolean;
}

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  uploading: boolean;
  uploadProgress: number;
  uploaded: boolean;
  url?: string;
  error?: string;
}

const ImageUploader: React.FC<MultiImageUploaderProps> = ({
  onImagesUploaded,
  maxSizeInMB = 5,
  label,
  multiple = false,
  maxFiles = 10,
  addToExistingOnly = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [confirmationMode, setConfirmationMode] =
    useState<boolean>(addToExistingOnly);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { uploadImage } = useImageUpload();

  const maxSize = maxSizeInMB * 1024 * 1024;

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [selectedFiles]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setFileError(null);

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

      if (acceptedFiles?.length > 0) {
        const newFiles = acceptedFiles.map((file) => ({
          id: Math.random().toString(36).substring(2, 9),
          file,
          preview: URL.createObjectURL(file),
          uploading: false,
          uploadProgress: 0,
          uploaded: false,
        }));

        if (multiple) {
          setSelectedFiles((prev) => {
            const combined = [...prev, ...newFiles];
            return combined.slice(0, maxFiles);
          });
        } else {
          setSelectedFiles(newFiles.slice(0, 1));
        }

        setConfirmationMode(true);
      }
    },
    [maxSizeInMB, multiple, maxFiles],
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: multiple ? maxFiles : 1,
    multiple: multiple,
    maxSize,
  };

  const { getRootProps, getInputProps, isDragActive, open } =
    useDropzone(dropzoneOptions);

  const handleRemoveFile = (id: string) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((file) => file.id !== id);
    });

    if (selectedFiles.length === 1 && !addToExistingOnly) {
      setConfirmationMode(false);
    }
  };

  const handleDiscard = () => {
    selectedFiles.forEach((file) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });

    setSelectedFiles([]);
    if (!addToExistingOnly) {
      setConfirmationMode(false);
    }
  };

  const handleConfirm = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);

    try {
      setSelectedFiles((prev) =>
        prev.map((file) => ({ ...file, uploading: true })),
      );

      const uploadResults: string[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const currentFile = selectedFiles[i];

        try {
          const response = await uploadImage.mutateAsync(currentFile.file);

          uploadResults.push(response);

          setSelectedFiles((prev) =>
            prev.map((file) =>
              file.id === currentFile.id
                ? {
                    ...file,
                    uploading: false,
                    uploaded: true,
                    url: response,
                  }
                : file,
            ),
          );
        } catch (error) {
          console.error(
            `Error uploading file ${currentFile.file.name}:`,
            error,
          );

          setSelectedFiles((prev) =>
            prev.map((file) =>
              file.id === currentFile.id
                ? {
                    ...file,
                    uploading: false,
                    error: "Upload failed",
                  }
                : file,
            ),
          );
        }
      }

      if (uploadResults.length > 0) {
        onImagesUploaded(uploadResults);
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Error during upload process:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (addToExistingOnly) {
    return (
      <div className="flex grow flex-col">
        <input {...getInputProps()} />

        <div className="flex flex-wrap gap-6">
          {selectedFiles.map((imageFile) => (
            <div key={imageFile.id} className="relative">
              <div className="group relative h-20 w-20 rounded-lg border border-neutral-200">
                {imageFile.uploading ? (
                  <div className="flex h-full w-full items-center justify-center bg-gray-50">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
                    <span className="absolute text-xs font-medium text-gray-700">
                      {imageFile.uploadProgress}%
                    </span>
                  </div>
                ) : (
                  <div className="relative size-20">
                    <ImageComponent
                      width={80}
                      height={80}
                      src={imageFile.url || imageFile.preview}
                      alt="Image preview"
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(imageFile.id);
                      }}
                      className="absolute -top-3 -right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-neutral-400 hover:text-neutral-500"
                      disabled={isUploading}
                    >
                      <Icon name="close" iconType="stroke" />
                    </button>
                  </div>
                )}

                {imageFile.error && (
                  <div className="absolute right-0 bottom-0 left-0 bg-red-100 px-1 py-0.5 text-center">
                    <span className="text-xs text-red-600">Failed</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {multiple && selectedFiles.length < maxFiles && (
            <button
              onClick={open}
              type="button"
              disabled={isUploading}
              className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-primary-300 hover:bg-primary-100"
            >
              <Icon
                name="plus"
                iconType="stroke"
                size={32}
                className="text-gray-400"
              />
            </button>
          )}
        </div>

        {fileError && (
          <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-2">
            <p className="text-xs text-red-600">{fileError}</p>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="mt-4 flex justify-end gap-x-2">
            <Button
              onClick={handleDiscard}
              variant="ghost"
              size="md"
              disabled={isUploading}
            >
              Discard
            </Button>
            <Button
              onClick={handleConfirm}
              size="md"
              disabled={isUploading}
              endIcon={<CheckCircleIcon className="h-4 w-4" />}
            >
              {isUploading ? "Uploading..." : "Confirm Upload"}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full">
      {label && !addToExistingOnly && (
        <div className="mb-1 flex items-center justify-between">
          <label className="text-secondary-700 text-sm font-normal">
            {label}
          </label>
        </div>
      )}

      {!confirmationMode && !addToExistingOnly ? (
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
              Drag and drop your image{multiple ? "s" : ""} here, or click to
              select
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Supports: JPG, PNG, GIF, WEBP (Max: {maxSizeInMB}MB
              {multiple ? `, up to ${maxFiles} files` : ""})
            </p>
          </div>

          {fileError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{fileError}</p>
            </div>
          )}
        </div>
      ) : (
        <div
          className={
            addToExistingOnly
              ? ""
              : "rounded-lg border border-primary-200 bg-white p-4"
          }
        >
          <input {...getInputProps()} />

          <div className={addToExistingOnly ? "" : "mb-4"}>
            <div
              className={
                addToExistingOnly
                  ? "flex flex-wrap gap-6"
                  : "my-3 flex flex-wrap gap-6"
              }
            >
              {selectedFiles.map((imageFile) => (
                <div key={imageFile.id} className="relative">
                  <div className="group relative h-20 w-20 rounded-lg border border-neutral-200">
                    {imageFile.uploading ? (
                      <div className="flex h-full w-full items-center justify-center bg-gray-50">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
                        <span className="absolute text-xs font-medium text-gray-700">
                          {imageFile.uploadProgress}%
                        </span>
                      </div>
                    ) : (
                      <div className="relative size-20">
                        <ImageComponent
                          width={80}
                          height={80}
                          src={imageFile.url || imageFile.preview}
                          alt="Image preview"
                          className="h-full w-full rounded-lg object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(imageFile.id);
                          }}
                          className="absolute -top-3 -right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-neutral-400 hover:text-neutral-500"
                          disabled={isUploading}
                        >
                          <Icon name="close" iconType="stroke" />
                        </button>
                      </div>
                    )}

                    {imageFile.error && (
                      <div className="absolute right-0 bottom-0 left-0 bg-red-100 px-1 py-0.5 text-center">
                        <span className="text-xs text-red-600">Failed</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {multiple && selectedFiles.length < maxFiles && (
                <button
                  onClick={open}
                  type="button"
                  disabled={isUploading}
                  className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-primary-300 hover:bg-primary-100"
                >
                  <Icon
                    name="plus"
                    iconType="stroke"
                    size={32}
                    className="text-gray-400"
                  />
                </button>
              )}
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className={`mt-4 flex justify-end gap-x-2`}>
              <Button
                onClick={handleDiscard}
                variant="ghost"
                size="md"
                disabled={isUploading}
              >
                Discard
              </Button>
              <Button
                onClick={handleConfirm}
                size="md"
                disabled={selectedFiles.length === 0 || isUploading}
                endIcon={<CheckCircleIcon className="h-4 w-4" />}
              >
                {isUploading ? "Uploading..." : "Confirm Upload"}
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

export default ImageUploader;
