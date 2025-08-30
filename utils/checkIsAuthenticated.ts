export const checkIsAuthenticated = async (
  token: string,
): Promise<boolean | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/is-authenticated`,
    {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    },
  );

  if (res.ok) {
    return true;
  } else {
    return false;
  }
};
