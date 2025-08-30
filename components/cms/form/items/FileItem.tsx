import axios from "axios";
import React, { ReactNode, useCallback, useState } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { useToggle } from "hooks/useToggle";
import { BaseApiResponse } from "types/baseApiTypes";
import DoughnutProgress from "components/image-search/DoughnutProgress";
import { Controller, useFormContext } from "react-hook-form";
import { FormItemProps } from "types/cms/form/formTypes";
import { cn } from "utils/helpers";

const FileItem: React.FC<FormItemProps> = (props) => {
  const { config } = props;
  const { fieldName } = config || {};

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const uploadedValue = watch(fieldName);

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Uploader
          onChange={field.onChange}
          label="Upload a document"
          folder="documents"
          error={
            errors[fieldName] ? String(errors[fieldName]?.message) : undefined
          }
          isUploaded={!!uploadedValue}
        />
      )}
    />
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

const Uploader: React.FC<FileItemProps> = (props) => {
  const {
    onChange,
    maxSizeInMB = 5,
    label,
    folder = "forms",
    error,
    helperText,
    isUploaded = true,
  } = props;
  const maxSize = maxSizeInMB * 1024 * 1024;

  const [uploadProgress, setUploadProgress] = useState<number>(10);

  const {
    close: uploaded,
    isOpen: isUploading,
    open: startUploading,
  } = useToggle();

  const handleUploadFile = useCallback(
    async (file: File) => {
      try {
        startUploading();
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post<BaseApiResponse<string>>(
          process.env.NEXT_PUBLIC_BASE_URL + `/common/upload?folder=${folder}`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setUploadProgress(
                  percentCompleted > 10 ? percentCompleted : 10,
                );
              }
              const isCompleted = progressEvent.loaded === progressEvent.total;

              if (isCompleted) {
                uploaded();
                setUploadProgress(10);
              }
            },
          },
        );

        if (response?.data?.data) {
          onChange(response.data.data);
        }
      } catch (error) {
        console.log(error);
        uploaded(); // Reset upload state on error
        setUploadProgress(10);
      }
    },
    [folder, onChange, startUploading, uploaded],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        console.warn("Some files were rejected:", rejectedFiles);
        return;
      }

      if (acceptedFiles.length > 0) {
        handleUploadFile(acceptedFiles[0]);
      }
    },
    [handleUploadFile],
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {},
    multiple: false,
    maxSize,
    disabled: isUploading,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  if (isUploading) {
    return (
      <div className="mx-auto w-full">
        <DashedBox error={!!error}>
          <DoughnutProgress percentage={90} strokeWidth={4} size={30} />
          <p className="mt-3 text-center text-sm text-gray-600">
            Uploading... {uploadProgress}%
          </p>
        </DashedBox>
      </div>
    );
  }

  const handleFileRemove = () => {
    onChange("");
    uploaded();
    setUploadProgress(10);
  };

  if (isUploaded) {
    return (
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-y-1">
        <DashedBox error={!!error}>
          <h5 className="font-medium text-primary-500">
            You file has been uploaded successfully!
          </h5>
        </DashedBox>
        <button
          onClick={handleFileRemove}
          type="button"
          className="mt-2 cursor-pointer rounded-md bg-gray-100 px-1.5 py-1 text-sm font-normal text-gray-700 hover:bg-gray-200/60"
        >
          Remove file
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all ${
          isDragActive
            ? "border-blue-400 bg-blue-50"
            : error
              ? "border-red-400 bg-red-50/50"
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="mb-3 h-12 w-12 text-gray-400" />
        <p className="text-center font-medium text-gray-700">
          {label ? label : "Drag and drop your file here, or click to select"}
        </p>
      </div>
      {helperText ||
        (error && (
          <p
            className={cn(
              "!text-[13px]",
              error ? "text-danger-500" : "text-neutral-400",
            )}
          >
            {error || helperText}
          </p>
        ))}
    </div>
  );
};

export default FileItem;

interface FileItemProps {
  onChange: (url: string) => void;
  maxSizeInMB?: number;
  label?: string;
  folder?: string;
  helperText?: string;
  error?: string;
  isUploaded?: boolean;
}

interface DashedBoxProps {
  className?: string;
  children: ReactNode;
  error?: boolean;
}

const DashedBox: React.FC<DashedBoxProps> = (props) => {
  const { className, children, error } = props;
  return (
    <div
      className={cn(
        "flex h-[132px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6",
        error ? "border-red-500" : "border-gray-300",
        className,
      )}
    >
      {children}
    </div>
  );
};
