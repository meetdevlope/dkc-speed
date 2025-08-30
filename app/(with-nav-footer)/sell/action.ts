import { Commission, CommissionTypes } from "types/commission.types";
import { fetchData } from "utils/apiCaller";

export const getCommissionList = async (
  type?: CommissionTypes,
): Promise<Commission[]> => {
  return fetchData<Commission[]>(
    `/common/commission/list?type=${type || CommissionTypes.customerCash}`,
    {
      errorMessage: "commission-list",
    },
  );
};
