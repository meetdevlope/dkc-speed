import { SSOEnum } from "enums/sso.enum";
import Image from "next/image";
import Link from "next/link";
import { getSSOConfig } from "../action";

interface SSOProps {
  redirectTo: string;
}

const SSO: React.FC<SSOProps> = async (props) => {
  const { redirectTo } = props;

  const ssoConfig = await getSSOConfig();

  const getUrl = getSSOUrl(redirectTo);

  return (
    <div className="mt-6 flex h-12 items-stretch justify-between gap-4 md:mt-8 md:h-14 lg:mt-10">
      {ssoConfig?.map((item, index) => (
        <Link
          href={getUrl[item.key]}
          key={index}
          className="fall w-full rounded-lg border border-neutral-200 transition-colors hover:bg-neutral-50/50"
        >
          <div className="relative size-5 md:size-6">
            <Image alt={item.key + "-alt"} src={item.logo} fill />
          </div>
        </Link>
      ))}
    </div>
  );
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getSSOUrl = (redirectTo: string) => ({
  [SSOEnum.apple]: `${BASE_URL}/auth/apple?redirectTo=${redirectTo}&redirectType=normal`,
  [SSOEnum.google]: `${BASE_URL}/auth/google?redirectTo=${redirectTo}&redirectType=normal`,
  [SSOEnum.facebook]: `${BASE_URL}/auth/facebook?redirectTo=${redirectTo}&redirectType=normal`,
});

export default SSO;
