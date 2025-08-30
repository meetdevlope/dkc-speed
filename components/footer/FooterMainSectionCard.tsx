import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { FooterMainCardType } from "types/cms/footer.types";
import { cn } from "utils/helpers";

interface FooterMainSectionCardProps {
  config: FooterMainCardType;
  mainSectionVersion: "v1" | "v2";
  textClass?: string;
}

const FooterMainSectionCard: React.FC<FooterMainSectionCardProps> = (props) => {
  const { config, mainSectionVersion, textClass = "" } = props;
  const { caption, externalLink, hideCaption, hideImage, image, isAction } =
    config || {};

  const jsx = () => (
    <div
      className={cn("flex h-full flex-col items-center justify-center gap-y-2")}
    >
      {!hideImage && (
        <div
          className={cn(
            "relative",
            mainSectionVersion === "v1" ? "size-8 shrink-0" : "h-10 w-32",
          )}
        >
          <ImageComponent
            alt={caption + " alt-img"}
            src={image}
            className="object-contain"
            width={128}
            height={10}
          />
        </div>
      )}
      {!hideCaption && (
        <p className={cn("text-center text-neutral-200", textClass)}>
          {caption}
        </p>
      )}
    </div>
  );

  return (
    <>
      {isAction ? (
        <a href={externalLink} target="_blank" rel="noopener noreferrer">
          {" "}
          {jsx()}
        </a>
      ) : (
        <div> {jsx()} </div>
      )}
    </>
  );
};

export default FooterMainSectionCard;
