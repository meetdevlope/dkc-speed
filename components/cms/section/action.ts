import {
  ComponentWidgetTypes,
  FaqType,
  FormConfigType,
  FormSubmitReq,
} from "types/cms/component.types";
import { fetchData } from "utils/apiCaller";

export const getCommonComponentDetails = async (
  key: string,
): Promise<ComponentWidgetTypes> => {
  return fetchData<ComponentWidgetTypes>(`/cms/component/details/${key}`, {
    errorMessage: "get-common-component-details",
  });
};
export const getFormConfig = async (id: string): Promise<FormConfigType> => {
  return fetchData<FormConfigType>(`/form/details/${id}`, {
    errorMessage: "get-form-config",
  });
};

export const getFAQs = async (id: string): Promise<FaqType> => {
  return fetchData<FaqType>(`/cms/faq/details/${id}`, {
    errorMessage: "get-faqs",
  });
};

export const submitCustomForm = async (
  formData: FormSubmitReq,
): Promise<any> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/form/submission/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to submit custom form");
  }

  return response.json();
};
