import { fetchData } from "utils/apiCaller";

export type Social = {
  label: string;
  logo: string;
  key: string;
};

export const getSSOConfig = async (): Promise<Social[]> => {
  return fetchData<Social[]>(`/common/login-sso-config`, {
    errorMessage: "get-sso-config",
    shouldNotThrowErrorOnCatch: true,
  });
};
