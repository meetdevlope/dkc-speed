"use client";

import { useUserGeolocation } from "hooks/useUserGeolocation";

const RenderGeoLocation = () => {
  useUserGeolocation();

  return null;
};

export default RenderGeoLocation;
