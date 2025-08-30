import { getCommonComponentDetails } from "components/cms/section/action";
import Icon from "components/icon/Icon";
import ImageSearch from "components/image-search/ImageSearch";
import Link from "next/link";
import { HeaderNavOptionType } from "types/cms/component.types";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import { jsonParser } from "utils/helpers";
import { ROUTES } from "utils/routes";
import Logo from "../logo/Logo";
import CartIcon from "./CartIcon";
import HeaderTabs from "./HeaderTabs";
import MenuDrawer from "./MenuDrawer";
import SearchDesk from "./SearchDesk";
import SubMenu from "./SubMenu";
import WishlistIcon from "./WishlistIcon";

const Header = async () => {
  const token = getToken();
  const deviceId = getDeviceId();

  const headerRes = await getCommonComponentDetails("header");
  const headerJson = jsonParser(headerRes?.json);
  const drawerData: HeaderNavOptionType[] = headerJson?.navOptions || [];
  const headerData: HeaderNavOptionType[] = headerJson?.webNavOptions || [];

  return (
    // <StickyHeaderWrapper>
    <header>
      <div className="mx-auto mt-1 flex max-w-8xl items-center px-4">
        <div className="mr-auto flex flex-1 items-center gap-x-1 lg:gap-0">
          <MenuDrawer headerData={drawerData} />
          <ImageSearch />
          <SearchDesk />
        </div>
        <div className="flex-1">
          <Logo className="mx-auto hidden md:flex md:justify-center" />
        </div>
        <div className="ml-auto flex flex-1 items-center justify-end space-x-3 md:flex-1">
          <WishlistIcon token={token || ""} />
          <CartIcon deviceId={deviceId || ""} token={token || ""} />
          <Link href={ROUTES.ACCOUNT.ROOT} className="flex items-center gap-1">
            <Icon name="avatar" iconType="stroke" className="stroke-[1.3px]" />
          </Link>
        </div>
      </div>
      {headerData?.length > 0 && <SubMenu headerData={headerData} />}
      <div className="block lg:hidden">
        <HeaderTabs />
      </div>
    </header>
    // </StickyHeaderWrapper>
  );
};

export default Header;
