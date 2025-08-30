"use client";

import Icon from "components/icon/Icon";
import LocalizationPreferences from "components/LocalizationPreferences";
import { useToggle } from "hooks/useToggle";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useAuthStore } from "store/auth";
import {
  CtaActionConfig,
  HeaderNavOptionType,
} from "types/cms/component.types";
import { ROUTES } from "utils/routes";
import Divider from "../Divider";
import Drawer from "../Drawer";
import Link from "next/link";
import { ImageComponent } from "components/image-component/ImageComponent";
import ActionWrapper from "components/cms/action/ActionWrapper";

type MenuDrawerProps = {
  headerData: HeaderNavOptionType[];
};

const MenuDrawer: React.FC<MenuDrawerProps> = (props) => {
  const { headerData } = props;

  const { isOpen, close, open } = useToggle();
  const router = useRouter();

  const userName = useAuthStore()?.user?.user?.firstName || "";

  const [menuStack, setMenuStack] = useState<HeaderNavOptionType[][]>([
    headerData,
  ]);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);

  const openSubMenu = useCallback(
    (item: HeaderNavOptionType) => {
      if (item.hasChild) {
        setMenuStack((prev) => [...prev, item.subNavOptions || []]);
        setActiveTitle(item.label);
      } else {
        close();
      }
    },
    [close, router],
  );

  const goBack = useCallback(() => {
    setMenuStack((prev) => prev.slice(0, -1));
    setActiveTitle(() =>
      menuStack.length > 2 ? menuStack[menuStack.length - 2][0]?.label : null,
    );
  }, [menuStack]);

  const currentMenu = useMemo(
    () => menuStack[menuStack.length - 1],
    [menuStack],
  );

  return (
    <div>
      <span
        className="mr-1 flex cursor-pointer items-center gap-2"
        onClick={open}
      >
        <Icon name="hamburger" iconType="stroke" className="stroke-[1.2px]" />
      </span>
      <Drawer isOpen={isOpen} onClose={close} direction="left">
        <div className="flex h-dvh flex-col gap-4">
          <div className="mx-4 mt-6 flex items-center gap-3">
            {activeTitle ? (
              <div className="flex w-full items-center justify-between gap-2 px-4">
                <span
                  className="absolute left-5 size-5 cursor-pointer"
                  onClick={goBack}
                >
                  <Icon
                    name="chevron"
                    color="var(--neutral-400)"
                    iconType="stroke"
                    className="rotate-90"
                    size={22}
                  />
                </span>
                <h5 className="w-full text-center font-semibold">
                  {activeTitle || "Shop"}
                </h5>
              </div>
            ) : (
              <>
                <span className="size-6 text-black">
                  <Icon
                    name="avatar"
                    iconType="stroke"
                    className="stroke-[1.3px]"
                  />
                </span>
                {userName ? (
                  <h5 className="font-medium">Hi, {userName}</h5>
                ) : (
                  <Link href={ROUTES.LOGIN} className="text-sm font-medium">
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
          <Divider />

          <div className="no-scrollbar overflow-y-auto">
            <div className="flex flex-col space-y-5 px-4">
              {currentMenu.map((item, index) => (
                <ActionWrapper
                  onClickConfig={item?.ctaConfig as CtaActionConfig}
                  key={index}
                >
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => openSubMenu(item)}
                  >
                    <h6 className="font-medium text-neutral-500">
                      {item?.label}
                    </h6>
                    {item.hasChild && (
                      <Icon
                        name="chevron"
                        iconType="stroke"
                        className="-rotate-90"
                        size={20}
                      />
                    )}
                  </div>
                </ActionWrapper>
              ))}
            </div>
            <div className="no-scrollbar flex gap-x-4 overflow-x-auto p-4">
              {currentMenu?.map((item, index) => (
                <div key={index}>
                  {item?.imageUrl && (
                    <ActionWrapper
                      onClickConfig={item?.ctaConfig as CtaActionConfig}
                    >
                      <div onClick={close}>
                        <ImageComponent
                          src={item?.imageUrl}
                          alt={item?.label + " - alt"}
                          width={320}
                          height={220}
                          className="aspect-video max-h-[220px] min-w-[320px] object-cover"
                        />
                        <p className="mt-1 ml-1 font-medium">
                          {" "}
                          {item?.label || ""}{" "}
                        </p>
                      </div>
                    </ActionWrapper>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="m-4 mt-auto flex justify-end pb-2">
            <LocalizationPreferences />
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default MenuDrawer;
