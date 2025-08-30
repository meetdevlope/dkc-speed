import { montserrat, syne } from "app/shared/fonts";
import GA from "app/shared/GA";
import QueryProvider from "app/shared/QueryProvider";
import SetDeviceId from "app/shared/SetDeviceId";
import ZohoThrive from "app/shared/ZohoThrive";
import RenderGeoLocation from "components/RenderGeoLocation";
import Toast from "components/Toast";
import "./globals.css";
import ZohoSalesIQ from "./shared/ZohoSalesIQ";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${montserrat.variable} h-screen w-full`}
      >
        <QueryProvider>
          <Toast />
          {children}
        </QueryProvider>
        <SetDeviceId />
        <RenderGeoLocation />
        <ZohoThrive />
        <ZohoSalesIQ />
        {/* <Script id="zoho-init" strategy="beforeInteractive">
          {`
          window.$zoho=window.$zoho || {};
          $zoho.salesiq=$zoho.salesiq||{ready:function(){}};
        `}
        </Script>

        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.eu/widget?wc=siqdb5e6de95e55ecd2c30ac1716082306ef643e6c998464c66a22b2ebbb507cc30"
          strategy="afterInteractive"
          defer
        /> */}
      </body>
      <GA />
    </html>
  );
}
