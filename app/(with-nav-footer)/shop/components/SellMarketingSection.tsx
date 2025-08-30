import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";

const SellMarketingSection = () => {
  return (
    <section className="bg-secondary flex h-[270px]">
      <div className="mt-3 flex w-[52%] flex-col items-start p-5">
        <h2>Got too many clothes?</h2>
        <p className="text-description mt-2">
          Clear some space in your wardrobe. Send us your pre-loved clothes to
          resell.
        </p>
        <Button
          className="mt-auto text-nowrap"
          endIcon={
            <span className="size-5">
              <Icon
                name="chevron"
                color="var(--neutral-400)"
                iconType="stroke"
                className="-rotate-90"
                size={22}
              />
            </span>
          }
        >
          Sell Your Items
        </Button>
      </div>
      <div className="relative h-full w-[48%]">
        <ImageComponent
          fill
          src={""}
          alt="sell-marketing-image"
          objectFit="contain"
          objectPosition="left bottom"
        />
      </div>
    </section>
  );
};

export default SellMarketingSection;
