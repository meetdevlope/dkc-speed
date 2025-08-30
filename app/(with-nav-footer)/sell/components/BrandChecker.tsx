import { ImageComponent } from "components/image-component/ImageComponent";
import { BrandCheckerWidgetModel } from "types/cms/component.types";
import BrandCheckerInput from "./BrandCheckerInput";

type BrandCheckerProps = {
  widgetConfig: BrandCheckerWidgetModel;
};

const BrandChecker: React.FC<BrandCheckerProps> = (props) => {
  const { widgetConfig } = props;
  const {
    title = "",
    hideTitle = false,
    description = "",
    hideDescription = false,
    tagLine = "",
    hideTagLine = false,
    imageUrl = "",
    hideImage = false,
  } = widgetConfig || {};

  return (
    <div className="bg-neutral-500 px-4 py-9 lg:px-24 lg:py-14">
      <div className="flex h-full flex-col lg:flex-row lg:gap-x-10">
        {!hideImage && (
          <div className="relative aspect-video w-full lg:max-w-xl">
            <ImageComponent alt="brand-checker-img" fill src={imageUrl} />
          </div>
        )}
        <div className="mt-4 flex flex-col">
          {!hideTitle && (
            <h5 className="text-left text-base text-white md:text-lg">
              {title}
            </h5>
          )}
          {!hideTagLine && (
            <p className="mt-2 text-neutral-300 md:text-sm">{tagLine}</p>
          )}
          <div className="mt-3 mb-6 w-full max-w-96">
            <BrandCheckerInput />
          </div>
          {!hideDescription && (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="mt-auto [&>*]:text-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandChecker;
