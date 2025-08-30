import { useMutation } from "@tanstack/react-query";
import Icon from "components/icon/Icon";
import Spinner from "components/spinner/Spinner";
import {
  virtualTryOnReview,
  VirtualTryOnReviewRequest,
} from "../[slug]/action";
import { cn } from "utils/helpers";

interface VirtualTryOnReviewProps {
  token: string;
  skuId: string;
}

const VirtualTryOnReview: React.FC<VirtualTryOnReviewProps> = (props) => {
  const { skuId, token } = props;

  const {
    mutateAsync: virtualTryOnReviewMutate,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (req: VirtualTryOnReviewRequest) =>
      virtualTryOnReview(token, req),

    onError: (error) => {
      console.error("Error while editing user mutation:", error.message);
    },
  });

  const handleClick = async (val: boolean) => {
    const req: VirtualTryOnReviewRequest = {
      productId: skuId,
      isLiked: val,
    };

    try {
      await virtualTryOnReviewMutate(req);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4 w-full">
      <h6>Did you like the output?</h6>
      <div className="mt-2 max-h-9 overflow-y-hidden">
        <div
          className={cn(
            "transition-all",
            isError
              ? "-translate-y-[108px]"
              : isSuccess
                ? "-translate-y-[72px]"
                : isPending
                  ? "-translate-y-9"
                  : "translate-y-0",
          )}
        >
          <div className="flex h-9 w-full items-center gap-x-2">
            <div
              className="fall w-full cursor-pointer rounded-md bg-red-50 p-2 transition-all hover:bg-red-100"
              onClick={() => handleClick(false)}
            >
              <Icon
                name="thumbs-down"
                iconType="stroke"
                size={20}
                className="stroke-[2px] text-danger-500"
              />
            </div>
            <div
              className="fall w-full cursor-pointer rounded-md bg-green-50 p-2 transition-all hover:bg-green-100"
              onClick={() => handleClick(true)}
            >
              <Icon
                name="thumbs-up"
                iconType="stroke"
                className="stroke-[2px] text-primary-500"
                size={20}
              />
            </div>
          </div>
          <div className="fall h-9 rounded-md bg-neutral-50">
            <Spinner color="#0A2A9A" />
          </div>
          <div className="fall h-9 gap-x-2 rounded-md bg-green-50">
            <h6 className="text-primary-500">Thank you</h6>
            <Icon
              name="check"
              iconType="stroke"
              size={16}
              className="stroke-[2px]"
              color="var(--primary-500)"
            />
          </div>
          <div className="fall h-9 gap-x-2 rounded-md bg-red-50">
            <h6 className="text-danger-500">Failed to submit</h6>
            <Icon
              name="sad"
              iconType="stroke"
              size={16}
              className="stroke-[2px]"
              color="red"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnReview;
