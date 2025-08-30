"use client";

import Link from "next/link";
import React, { CSSProperties } from "react";
import { CtaActionConfig, CtaRedirectionType } from "types/cms/component.types";
import { cn } from "utils/helpers";
import { ROUTES } from "utils/routes";

interface ActionWrapperProps {
  children: React.ReactNode;
  onClickConfig: CtaActionConfig;
  className?: string;
  linkClassName?: string;
  styles?: CSSProperties;
}

const ActionWrapper: React.FC<ActionWrapperProps> = (props) => {
  const {
    children,
    onClickConfig,
    className = "",
    linkClassName = "",
    styles,
  } = props;

  const handleRedirect = (
    redirectType: CtaRedirectionType | undefined,
    value: string,
  ) => {
    if (!redirectType) {
      console.warn("Redirect type not specified");
      return;
    }

    let redirectPath: string;

    switch (redirectType) {
      case "collection":
        redirectPath = ROUTES.COLLECTION.COLLECTION_PRODUCTS(value);
        break;

      case "productDetails":
        redirectPath = ROUTES.PRODUCTS.SLUG(value);
        break;

      case "brand":
        redirectPath = ROUTES.BRAND.BRAND_PRODUCTS(value);
        break;

      case "category":
        redirectPath = ROUTES.CATEGORY.CATEGORY_PRODUCTS(value);
        break;

      case "blog":
        redirectPath = ROUTES.BLOGS.BLOG_DETAILS(value);
        break;

      case "simpleBag":
        redirectPath = ROUTES.PRODUCTS.ORDER_DKC_BAG;
        break;

      case "recommendation":
        redirectPath =
          ROUTES.ACCOUNT.DIGITAL_WARDROBE.WARDROBE_RECOMMENDATION_PRODUCTS(
            value,
          );
        break;

      case "registerBag":
        redirectPath = ROUTES.ACCOUNT.VERIFY_BAG_RETURN("bag-number");
        break;

      case "brandBag":
        redirectPath = ROUTES.PARTNER_BRAND(value);
        break;

      case "customPage":
      case "inAppPages":
        redirectPath = normalizePath(value);
        break;

      default:
        console.warn(`Unhandled redirect type: ${redirectType}`);
        return "#";
    }

    return redirectPath;
  };

  if (!onClickConfig) {
    return <>{children}</>;
  }

  if (onClickConfig.actionType === "redirect") {
    return (
      <Link
        href={
          handleRedirect(onClickConfig.redirectType, onClickConfig.value) || "#"
        }
        className={cn("block", linkClassName)}
        style={styles}
      >
        {children}
      </Link>
    );
  }

  if (onClickConfig.actionType === "external-link") {
    return (
      <Link
        passHref
        target="_blank"
        href={onClickConfig.value}
        style={styles}
        className={cn("block", linkClassName)}
      >
        {children}
      </Link>
    );
  }

  if (onClickConfig.actionType === "addBagToCart") {
    return (
      <Link
        passHref
        target="_blank"
        href={ROUTES.PRODUCTS.ORDER_DKC_BAG}
        style={styles}
        className={cn("block", linkClassName)}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className={`cursor-pointer ${className}`}
      style={styles}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default ActionWrapper;

const normalizePath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;
