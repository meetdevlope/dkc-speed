"use client";

import { useEffect } from "react";
import { getUserEmail } from "utils/user-email";

const ZohoThrive = () => {
  const email = getUserEmail() || "";
  const customerId = email;
  const secret = "4d39edd47df4cd34c626d53fb2c3d165";
  const widgetCode =
    "2b35981f354120b14b2dbeda63ba90366b94e4454de23f696494ba8b273655d3";

  const generateHMAC = async (
    emailId: string,
    customerId: string,
    secret: string,
  ) => {
    const digestRaw = emailId + customerId;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(digestRaw);

    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const signature = await crypto.subtle.sign("HMAC", key, messageData);
    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  useEffect(() => {
    const initThrive = async () => {
      const digest = await generateHMAC(email, customerId, secret);

      // Inject inline config script
      const configScript = document.createElement("script");
      configScript.type = "text/javascript";
      configScript.text = `
        window.platformType = 'custom_user_site';
        window.thriveWidgetCode = '${widgetCode}';
        window.ztUserData = {
          za_email_id: '${email}',
          user_unique_id: '${customerId}',
          thrive_digest: '${digest}',
          signUpPage: 'https://demo.designerkidsclub.com/register',
          signInPage: 'https://demo.designerkidsclub.com/login'
        };
        window.ztWidgetDelay = 5;
      `;
      document.head.appendChild(configScript);

      // Inject Thrive script
      const thriveScript = document.createElement("script");
      thriveScript.src =
        "https://thrive.zohopublic.eu/thrive/publicpages/thrivewidget";
      thriveScript.async = true;
      thriveScript.defer = true;
      thriveScript.id = "thrive_script";
      document.body.appendChild(thriveScript);

      return () => {
        document.head.removeChild(configScript);
        document.body.removeChild(thriveScript);
      };
    };

    if (email) {
      initThrive();
    }
  }, [email]);

  return null; // No visual element needed
};

export default ZohoThrive;
