import { ImageComponent } from "components/image-component/ImageComponent";
import { CSSProperties, FC, useMemo } from "react";
import { ImageWidgetModel } from "types/cms/component.types";
import { PreviewProps } from "./types";

interface ImageProps extends PreviewProps {
  widgetConfig: ImageWidgetModel;
}

export const ImageWidgetPreview: FC<ImageProps> = (props) => {
  const { widgetConfig, valueProps } = props;
  const {
    altText,
    imageUrl: defImageUrl,
    fit,
    imageAlign,
    ratio,
    propImageUrl,
  } = widgetConfig || {};
  const nAlign =
    imageAlign === "start"
      ? "left"
      : imageAlign === "end"
        ? "right"
        : imageAlign;

  const style = useMemo<CSSProperties>(
    () => ({
      aspectRatio: ratio,
    }),
    [ratio],
  );

  const imageUrl = () => {
    if (valueProps && propImageUrl && valueProps[propImageUrl]) {
      const value = valueProps?.[propImageUrl];
      if (typeof value === "string" && value) {
        return value;
      }
    }
    return defImageUrl;
  };

  return (
    <div className="relative h-fit w-full overflow-hidden" style={style}>
      {
        <ImageComponent
          src={imageUrl()}
          alt={altText}
          style={{ objectFit: fit, objectPosition: nAlign }}
          className="h-full w-full"
          fill
        />
      }
    </div>
  );
};
