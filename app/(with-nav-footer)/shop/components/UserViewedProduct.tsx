import { userViewedProduct } from "app/(with-nav-footer)/action";
import React from "react";

type UserViewedProductProps = {
  deviceId: string;
  productId: string;
  token: string;
};

const UserViewedProduct: React.FC<UserViewedProductProps> = async (props) => {
  const { deviceId, productId, token } = props;

  await userViewedProduct(deviceId, productId, token);

  return <></>;
};

export default UserViewedProduct;
