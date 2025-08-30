import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

// Define the expected API response format

// Define the hook's return type
interface UseImageUploadResult {
  uploadImage: UseMutationResult<any, Error, File | null>;
  progress: number;
  isUploading: boolean;
  resetProgress: () => void;
}

const useImageUpload = (): UseImageUploadResult => {
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const resetProgress = () => {
    setProgress(0);
  };

  const uploadImage = useMutation<any, Error, File | null>({
    mutationFn: async (file: File | null): Promise<any> => {
      if (!file) return null;

      setIsUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/common/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setProgress(percentCompleted);
              }
            },
          },
        );

        return response.data?.data;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to upload image",
        );
      } finally {
        setIsUploading(false);
      }
    },
  });

  return {
    uploadImage,
    progress,
    isUploading,
    resetProgress,
  };
};

export default useImageUpload;
