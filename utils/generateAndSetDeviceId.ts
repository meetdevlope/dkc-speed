export const generateAndSetDeviceID = async () => {
  try {
    const res = await fetch(`/api/new-device-id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    return data?.deviceId;
  } catch (error) {
    console.error("Error setting new device id:", error);
  }
};
