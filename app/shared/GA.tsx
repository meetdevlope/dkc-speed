import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA = () => {
  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_KEY || ""} />;
};

export default GA;
