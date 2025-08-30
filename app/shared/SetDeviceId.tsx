"use client";

import { useEffect } from "react";

const SetDeviceId = () => {
  const setDeviceId = async () => {
    await fetch(`/api/set-device-id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  useEffect(() => {
    setDeviceId();
  }, []);

  return null;
};

export default SetDeviceId;
