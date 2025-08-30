"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { FormSubmitReq, FormWidgetModel } from "types/cms/component.types";
import { FormSettings } from "types/cms/form/formTypes";
import { getFormConfig, submitCustomForm } from "../section/action";
import FormWrapper from "./FormWrapper";
import toast from "react-hot-toast";

type FormRendererProps = {
  widgetConfig: FormWidgetModel;
};

const FormRenderer: React.FC<FormRendererProps> = (props) => {
  const { widgetConfig } = props;
  const { formId } = widgetConfig || {};

  const { data: formConfig, isLoading } = useQuery({
    queryFn: () => getFormConfig(formId),
    queryKey: ["form-config", formId],
    enabled: Boolean(formId),
  });

  const { item, setting, refId } = formConfig || {};

  const submitFormMutation = useMutation({
    mutationFn: submitCustomForm,
    onSuccess: () => {
      toast.success("Form submitted successfully");
    },
    onError: (error) => {
      toast.error("Cant submit form");
      console.log(error, "custom form submit error");
    },
  });

  const handleSubmit = (data: Record<string, string>) => {
    const formSubmitReq: FormSubmitReq = {
      refId: refId || "",
      data: data,
    };
    submitFormMutation.mutate(formSubmitReq);
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-y-3">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="shimmer-loading h-12 w-full rounded-md bg-gray-100"
            />
          ))}
      </div>
    );

  return (
    <FormWrapper
      formItems={item || []}
      settings={setting as FormSettings}
      onSubmit={handleSubmit}
    />
  );
};

export default FormRenderer;
