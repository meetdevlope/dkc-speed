import axios from "axios";
import Icon from "components/icon/Icon";
import { useToggle } from "hooks/useToggle";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BaseApiResponse } from "types/baseApiTypes";
import { ROUTES } from "utils/routes";
import DoughnutProgress from "./DoughnutProgress";

type ImageUploadProps = {
  iconColor?: "white" | "black";
};

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const { iconColor = "black" } = props;

  const [uploadProgress, setUploadProgress] = useState<number>(10);

  const {
    close: uploaded,
    isOpen: isUploading,
    open: startUploading,
  } = useToggle();

  const router = useRouter();

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;

    try {
      if (inputFiles && inputFiles.length > 0) {
        const file = inputFiles?.[0];

        startUploading();
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post<BaseApiResponse<string>>(
          process.env.NEXT_PUBLIC_BASE_URL +
            "/common/upload?folder=image_search",
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
          router.push(ROUTES.IMAGE_SEARCH(response?.data?.data || ""));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isUploading ? (
        <DoughnutProgress percentage={uploadProgress} strokeWidth={5} />
      ) : (
        <div>
          <input
            type="file"
            name="image-search"
            id="image-search"
            className="hidden"
            onChange={handleUploadFile}
          />
          <label htmlFor="image-search">
            <Icon
              name="image-search"
              className="cursor-pointer"
              color={iconColor}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
