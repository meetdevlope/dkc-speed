import React, { useCallback } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxSizeInMB?: number;
  label?: string;
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const { onFilesSelected, maxSizeInMB = 5, label } = props;
  const maxSize = maxSizeInMB * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        console.warn("Some files were rejected:", rejectedFiles);
        return;
      }

      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [onFilesSelected],
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
    <div className="mx-auto w-full">
      {label && <p className="mb-2 text-sm text-gray-600">{label}</p>}
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all ${
          isDragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="mb-3 h-12 w-12 text-gray-400" />
        <p className="text-center font-medium text-gray-700">
          Drag and drop your image(s) here, or click to select
        </p>
        <p className="mt-2 text-center text-sm text-gray-500">
          JPG, PNG, GIF, WEBP up to {maxSizeInMB}MB
        </p>
      </div>
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

export default FileUploader;
