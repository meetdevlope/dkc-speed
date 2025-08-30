"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import Dialog from "components/Dialog";
import FileUploader from "components/FileUploader";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";
import Spinner from "components/spinner/Spinner";
import { useToggle } from "hooks/useToggle";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "store/auth";
import { ROUTES } from "utils/routes";
import { generateVirtualTryOn, VirtualTryOnRequest } from "../[slug]/action";
import dayjs from "dayjs";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import VirtualTryOnReview from "./VirtualTryOnReview";
import useImageUpload from "hooks/useImageUpload";
import DoughnutProgress from "components/image-search/DoughnutProgress";

interface VirtualTryOnButtonProps {
  token: string;
  slug: string;
  productImage: string;
  skuId: string;
}

const VirtualTryOnButton: React.FC<VirtualTryOnButtonProps> = (props) => {
  const { skuId, slug, token, productImage } = props;

  const [showText, setShowText] = useState(true);
  const [imageToTry, setImageToTry] = useState<string>("");
  const [generatedImage, setGeneratedImage] = useState<string>();
  const { close, isOpen, open } = useToggle();
  const isAuthenticated = useAuthStore()?.isAuthenticated;
  const user = useAuthStore((state) => state?.user?.user);
  const { uploadImage, progress, isUploading } = useImageUpload();

  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setShowText(true);
    }, 500);

    const collapseTimer = setTimeout(() => {
      setShowText(false);
    }, 4000);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(collapseTimer);
    };
  }, []);

  const handleOnImageUpload = async (file: File[]) => {
    if (file?.length > 0) {
      const selectedFile = file[0];

      try {
        const result = await uploadImage.mutateAsync(selectedFile);

        if (result) {
          setImageToTry(result);
          setGeneratedImage("");
          toast.success("Image uploaded successfully.");
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("An error occurred during upload.");
      }
    }
  };

  const { mutateAsync: generateVirtualTryOnMutate, isPending } = useMutation({
    mutationFn: (req: VirtualTryOnRequest) => generateVirtualTryOn(token, req),
    onSuccess: (response: string) => {
      setImageToTry("");
      setGeneratedImage(response);
      toast.success("Virtual Try on generated successfully.");
    },
    onError: (error) => {
      console.error("Error while editing user mutation:", error.message);
      toast.error("Couldnt generate Virtual Try On");
    },
  });

  const handleContinue = async () => {
    const req: VirtualTryOnRequest = {
      productImage,
      image: imageToTry,
    };

    try {
      await generateVirtualTryOnMutate(req);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, {
        mode: "cors",
      });

      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${user?.firstName || ""} ${skuId || ""}  Virtual Try On - ${dayjs(dayjs()).format("DD/MM/YYYY HH:mm")}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleClose = () => {
    setImageToTry("");
    close();
  };

  const handleGenerateNew = () => {
    setImageToTry("");
    setGeneratedImage("");
  };

  return (
    <div>
      <Button
        size="sm"
        className={`absolute top-3 right-6 flex gap-x-2 rounded-full ${showText ? "w-36" : "w-8"}`}
        onClick={open}
        style={{
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {showText && <span>Virtual Try On</span>}
        <span className="ml-auto">
          <Icon name="shirt" size={20} />
        </span>
      </Button>
      <>
        <Dialog
          isOpen={isOpen}
          onClose={close}
          noClose
          actions={
            generatedImage || !isAuthenticated
              ? {}
              : {
                  primary: {
                    label: "Continue",
                    size: "sm",
                    onClick: handleContinue,
                    disabled: isPending,
                  },
                  secondary: {
                    label: "Cancel",
                    size: "sm",
                    onClick: handleClose,
                  },
                }
          }
          title={
            <div className="flex items-center gap-x-4">
              <div className="fall size-12 rounded-full bg-primary-light">
                <Icon name="shirt" size={20} className="text-primary-500" />
              </div>
              <div>
                <h5 className="font-semibold">Virtual Try On</h5>
                <p className="text-neutral-400">
                  Upload your photo to get started
                </p>
              </div>
            </div>
          }
        >
          <>
            {isAuthenticated ? (
              <div>
                <div className="fall transition-all">
                  {isPending ? (
                    <Spinner color="var(--primary-500)" size={50} />
                  ) : generatedImage ? (
                    <div className="fall flex-col">
                      <Zoom
                        zoomImg={{
                          src: generatedImage,
                          alt: "Zoomed virtual try-on image",
                        }}
                      >
                        <ImageComponent
                          src={generatedImage}
                          height={400}
                          width={400}
                          alt="virtual-try-on-result-alt"
                          className="mx-auto w-full max-w-52 cursor-zoom-in rounded-sm"
                        />
                      </Zoom>
                      <VirtualTryOnReview skuId={skuId} token={token} />
                      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
                        <Button
                          size="md"
                          fullWidth
                          startIcon={<Icon name="download" iconType="stroke" />}
                          onClick={() => handleDownload(generatedImage)}
                        >
                          Download
                        </Button>
                        <Button
                          size="md"
                          fullWidth
                          variant="outline"
                          onClick={handleGenerateNew}
                        >
                          Generate new
                        </Button>
                      </div>
                    </div>
                  ) : isUploading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <DoughnutProgress
                        percentage={progress}
                        strokeWidth={4}
                        size={80}
                      />
                      <p className="mt-3 text-sm text-neutral-500">
                        Uploading photo...
                      </p>
                    </div>
                  ) : imageToTry ? (
                    <ImageComponent
                      src={imageToTry}
                      height={400}
                      width={400}
                      alt="uploaded-photo-preview"
                      className="mx-auto max-w-52 rounded-sm"
                    />
                  ) : (
                    <FileUploader onFilesSelected={handleOnImageUpload} />
                  )}
                </div>

                <div className="mt-6 rounded-md bg-neutral-50 p-2">
                  <p className="text-neutral-400">
                    Your photos are processed securely and never stored or
                    shared. We prioritize your privacy every step of the way.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <Link
                  href={
                    ROUTES.LOGIN +
                    "?redirectTo=" +
                    decodeURIComponent(ROUTES.PRODUCTS.SLUG(slug))
                  }
                >
                  <Button size="md" fullWidth>
                    Login
                  </Button>
                </Link>
                <div className="mt-2 rounded-md bg-blue-light p-2">
                  <p className="text-center text-neutral-400">
                    You must be logged in to use Virtual Try On
                  </p>
                </div>
              </div>
            )}
          </>
        </Dialog>
      </>
    </div>
  );
};

export default VirtualTryOnButton;
