import Icon from "components/icon/Icon";
import { IconName } from "components/icon/Icons";
import LinkOrText from "components/LinkOrText";
import { isNullish } from "utils/helpers";

export type AccountCardTypes = {
  title: string;
  data?: any;
  icon: IconName;
  link?: string;
  isMyImpactCard?: boolean;
};

const AccountCard: React.FC<AccountCardTypes> = (props) => {
  const { icon, title, data, link, isMyImpactCard } = props;

  return (
    <LinkOrText
      isLink={Boolean(link)}
      link={link}
      className={`h-full ${isMyImpactCard ? "col-span-2 lg:col-span-1" : ""}`}
    >
      <div className="flex h-full flex-col gap-5 rounded-md p-4 shadow">
        <div
          className={`flex flex-col gap-y-4 ${isMyImpactCard ? "lg:m-auto" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="fall rounded-md bg-primary-light p-2">
              <Icon
                name={icon}
                iconType="stroke"
                size={20}
                className="stroke-[1.3px]"
                color="var(--primary-500)"
              />
            </div>
            <h6 className={`text-sm font-medium text-neutral-400`}>{title}</h6>
          </div>

          <div className="flex items-center justify-between">
            <h6 className="ml-2 text-base font-medium">
              {isNullish(data) ? 0 : data}
            </h6>

            {link && (
              <Icon
                name="chevron"
                iconType="stroke"
                className="-rotate-90 text-neutral-400"
                size={20}
              />
            )}
          </div>
        </div>
      </div>
    </LinkOrText>
  );
};

export default AccountCard;
