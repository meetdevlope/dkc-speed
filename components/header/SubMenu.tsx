import ActionWrapper from "components/cms/action/ActionWrapper";
import { ImageComponent } from "components/image-component/ImageComponent";
import {
  CtaActionConfig,
  HeaderNavOptionType,
} from "types/cms/component.types";
import { cn } from "utils/helpers";
import styles from "./header.module.css";
import HeaderTabs from "./HeaderTabs";

type SubMenuProps = {
  headerData: HeaderNavOptionType[];
};

const SubMenu: React.FC<SubMenuProps> = ({ headerData }) => {
  return (
    <div className="bg-neutral-500">
      <div className="no-scrollbar mx-auto hidden max-w-8xl items-center overflow-x-auto px-4 py-1 text-neutral-100 lg:flex xl:justify-center">
        <HeaderTabs />
        <div className="z-50 flex w-full max-w-6xl justify-center">
          {headerData?.map((item, index) => {
            const subNavOptions = item?.subNavOptions || [];

            const withChild = subNavOptions.filter((opt) => opt?.hasChild);
            const withoutChild = subNavOptions.filter((opt) => !opt?.hasChild);
            const withImages = subNavOptions?.filter((opt) => opt?.imageUrl);

            return (
              <div
                key={index}
                className={`${styles.liItem} w-ful z-10 block text-sm font-medium hover:font-semibold hover:text-white`}
              >
                <ActionWrapper
                  onClickConfig={item?.ctaConfig as CtaActionConfig}
                  className="w-full"
                >
                  <h6 className="from-primary1 w-full px-3 py-1 text-center text-xs font-medium text-nowrap uppercase hover:font-semibold">
                    {item?.label}
                  </h6>
                </ActionWrapper>

                {item?.hasChild && (
                  <div
                    className={`z-20 max-w-8xl overflow-x-hidden ${styles.subParent} no-scrollbar rounded-md pt-2 shadow-lg`}
                  >
                    <div
                      className={cn(
                        "flex w-full gap-1 gap-x-8 overflow-y-auto rounded-sm border border-neutral-100 bg-white px-10 py-6",
                        withImages && withImages.length > 0
                          ? ""
                          : "max-h-[80vh]",
                      )}
                    >
                      <div className="flex flex-col items-start">
                        {withoutChild.map((e, i) => (
                          <div
                            key={`no-child-${i}`}
                            className="px-4 py-0 pb-3 font-medium text-nowrap text-slate-800 hover:font-semibold"
                          >
                            <ActionWrapper
                              onClickConfig={e?.ctaConfig as CtaActionConfig}
                            >
                              <h6 className="from-primary1 w-full py-1 text-center text-xs font-semibold text-nowrap text-slate-800 uppercase">
                                {e?.label}
                              </h6>
                            </ActionWrapper>
                          </div>
                        ))}
                      </div>
                      <div
                        className={`columns-1 gap-6 sm:columns-2 xl:columns-3`}
                      >
                        {withChild.map((e, i) => (
                          <div
                            key={`with-child-${i}`}
                            className="mb-6 break-inside-avoid px-4 font-medium text-nowrap text-slate-800 hover:font-semibold"
                          >
                            <ActionWrapper
                              onClickConfig={e?.ctaConfig as CtaActionConfig}
                            >
                              <h6 className="from-primary1 w-full py-1 text-xs font-semibold text-nowrap text-slate-800 uppercase">
                                {e?.label}
                              </h6>
                            </ActionWrapper>

                            <div className="mt-1 ml-1">
                              {e?.subNavOptions?.map((a, b) =>
                                !a?.hasChild ? (
                                  <ActionWrapper
                                    key={`grandchild-${b}`}
                                    onClickConfig={
                                      a?.ctaConfig as CtaActionConfig
                                    }
                                  >
                                    <h6 className="from-primary1 w-full py-2 text-xs font-medium text-nowrap text-gray-500 hover:text-gray-800">
                                      {a?.label}
                                    </h6>
                                  </ActionWrapper>
                                ) : null,
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="ml-auto flex flex-col items-start gap-y-2">
                        {withImages?.map(
                          (e, i) =>
                            e?.imageUrl && (
                              <ActionWrapper
                                onClickConfig={
                                  item?.ctaConfig as CtaActionConfig
                                }
                                key={i}
                              >
                                <div>
                                  <ImageComponent
                                    src={e?.imageUrl}
                                    alt={item?.label + " - alt"}
                                    width={320}
                                    height={220}
                                    className="aspect-video max-h-[220px] min-w-[320px] object-cover"
                                  />
                                  <p className="mt-1 ml-1 font-medium">
                                    {" "}
                                    {e?.label || ""}{" "}
                                  </p>
                                </div>
                              </ActionWrapper>
                            ),
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Opacity 0 to balance navs */}
        <div className="pointer-events-none opacity-0">
          <HeaderTabs />
        </div>
        {/* Opacity 0 to balance navs */}
      </div>
    </div>
  );
};

export default SubMenu;
