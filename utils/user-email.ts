const emailKey = "dkc-user-email";

export const setUserEmail = (value: string, days: number = 30) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${emailKey}=${value}; ${expires}; path=/`;
};
export const getUserEmail = (): string | null => {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${emailKey}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export const removeUserEmail = (): void => {
  document.cookie = `${emailKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
