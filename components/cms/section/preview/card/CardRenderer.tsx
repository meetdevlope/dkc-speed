import ActionWrapper from "components/cms/action/ActionWrapper";
import { FC } from "react";
import {
  AppCardVersion,
  CtaActionConfig,
  CustomAppCardModel,
} from "types/cms/component.types";
import CardV1 from "./CardV1";
import CardV10 from "./CardV10";
import CardV11 from "./CardV11";
import CardV12 from "./CardV12";
import CardV13 from "./CardV13";
import CardV14 from "./CardV14";
import CardV2 from "./CardV2";
import CardV3 from "./CardV3";
import CardV4 from "./CardV4";
import CardV5 from "./CardV5";
import CardV6 from "./CardV6";
import CardV7 from "./CardV7";
import CardV8 from "./CardV8";
import CardV9 from "./CardV9";
import CardV15 from "./CardV15";

export type AppCardProps = {
  config: CustomAppCardModel;
  version: AppCardVersion;
  isWidthCard?: boolean;
};

const CardRenderer: FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard = false } = props;

  const render = () => {
    switch (version) {
      case "v1":
        return (
          <CardV1 config={config} version={version} isWidthCard={isWidthCard} />
        );
      case "v2":
        return (
          <CardV2 config={config} version={version} isWidthCard={isWidthCard} />
        );
      case "v3":
        return (
          <CardV3 config={config} version={version} isWidthCard={isWidthCard} />
        );
      case "v4":
        return (
          <CardV4 config={config} version={version} isWidthCard={isWidthCard} />
        );
      case "v5":
        return (
          <CardV5 config={config} version={version} isWidthCard={isWidthCard} />
        );
      case "v6":
        return (
          <CardV6 config={config} version={version} isWidthCard={isWidthCard} />
        );
      case "v7":
        return (
          <CardV7 config={config} version={version} isWidthCard={isWidthCard} />
        );
      case "v8":
        return (
          <CardV8 config={config} version={version} isWidthCard={isWidthCard} />
        );
      case "v9":
        return (
          <CardV9 config={config} version={version} isWidthCard={isWidthCard} />
        );
      case "v10":
        return (
          <CardV10
            config={config}
            version={version}
            isWidthCard={isWidthCard}
          />
        );
      case "v11":
        return (
          <CardV11
            config={config}
            version={version}
            isWidthCard={isWidthCard}
          />
        );
      case "v12":
        return (
          <CardV12
            config={config}
            version={version}
            isWidthCard={isWidthCard}
          />
        );
      case "v13":
        return (
          <CardV13
            config={config}
            version={version}
            isWidthCard={isWidthCard}
          />
        );
      case "v14":
        return (
          <CardV14
            config={config}
            version={version}
            isWidthCard={isWidthCard}
          />
        );
      case "v15":
        return (
          <CardV15
            config={config}
            version={version}
            isWidthCard={isWidthCard}
          />
        );
      default:
        return <>Card version not supported</>;
    }
  };

  return (
    <ActionWrapper onClickConfig={config.onClickConfig as CtaActionConfig}>
      {render()}
    </ActionWrapper>
  );
};

export default CardRenderer;
