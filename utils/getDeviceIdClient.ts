export const getDeviceIdClient = () => {
  if (typeof window !== "undefined") {
    const id = document.cookie
      .split("; ")
      .find((row) => row.startsWith("dkc-device-id"))
      ?.split("=")[1];
    return id || null;
  }
  return null;
};
