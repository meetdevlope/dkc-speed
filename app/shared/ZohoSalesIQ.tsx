"use client";

import { useEffect } from "react";

const ZohoSalesIQ = () => {
  useEffect(() => {
    const inlineScript = document.createElement("script");
    inlineScript.id = "zoho-init";
    inlineScript.innerHTML = `
      window.$zoho=window.$zoho || {};
      $zoho.salesiq=$zoho.salesiq||{ready:function(){}};
    `;
    document.head.appendChild(inlineScript);

    const externalScript = document.createElement("script");
    externalScript.id = "zsiqscript";
    externalScript.src =
      "https://salesiq.zohopublic.eu/widget?wc=siqdb5e6de95e55ecd2c30ac1716082306ef643e6c998464c66a22b2ebbb507cc30";
    externalScript.defer = true;

    document.body.appendChild(externalScript);

    return () => {
      document.head.removeChild(inlineScript);
      document.body.removeChild(externalScript);
    };
  }, []);

  return null;
};

export default ZohoSalesIQ;
