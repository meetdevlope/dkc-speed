"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormItemTypeInfo, FormSettings } from "types/cms/form/formTypes";
import FormItemRenderer from "./FormItemRenderer";
import { z } from "zod";

type FormWrapperProps = {
  settings: FormSettings;
  formItems: FormItemTypeInfo[];
  onSubmit: (data: Record<string, any>) => void;
};

function emailValidation(field: FormItemTypeInfo): z.ZodString {
  let schema = z.string();
  if (field.isRequired) {
    schema = schema
      .email()
      .min(1, field.requiredErrorText || "This field is required");
  }
  return schema;
}

function stringValidation(field: FormItemTypeInfo): z.ZodString {
  let schema = z.string();
  if (field.isRequired) {
    schema = schema.min(1, field.requiredErrorText || "This field is required");
  }
  return schema;
}

const FormWrapper: React.FC<FormWrapperProps> = (props) => {
  const { settings, formItems, onSubmit } = props || {};
  const {
    gap = 12,
    width = 100,
    paddingX = 10,
    paddingY = 10,
    align = "center",
  } = settings || {};

  function generateItemZodSchema(field: any): z.ZodTypeAny {
    let schema: z.ZodTypeAny;

    switch (field.type) {
      case "email":
        schema = emailValidation(field);
        break;
      case "file":
      case "text":
        schema = stringValidation(field);
        break;
      case "number":
        schema = stringValidation(field);
        break;

      default:
        schema = z.any();
    }

    return schema;
  }

  function generateSchemaFromFields(
    fields: FormItemTypeInfo[],
  ): z.ZodObject<any> {
    const shape: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field) => {
      if (
        (field.type === "row" || field.type === "column") &&
        field.childrenConfig
      ) {
        field.childrenConfig?.forEach((e) => {
          shape[e.fieldName] = generateItemZodSchema(e);
        });
      }
      if (field.type === "address" && field.addressConfig)
        Object.keys(field.addressConfig).forEach((e) => {
          shape[e] = generateItemZodSchema(e);
        });
      shape[field.fieldName] = generateItemZodSchema(field);
    });

    return z.object(shape);
  }

  const schema = generateSchemaFromFields(formItems);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  return (
    <div className="flex flex-col">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex w-full flex-col"
          style={{
            width: `${width}%`,
            padding: `${paddingY}px ${paddingX}px`,
            gap: `${gap}px`,
            alignItems: align,
          }}
        >
          {formItems.map((config, index) => (
            <FormItemRenderer config={config} key={index} />
          ))}
        </form>
      </FormProvider>
    </div>
  );
};

export default FormWrapper;
