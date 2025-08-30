// type FormItemType =
//   | "text"
//   | "email"
//   | "number"
//   | "check_box"
//   | "radio_button"
//   | "drop_down"
//   | "textLabel"
//   | "row"
//   | "address";

// interface FormItemBase {
//   type: FormItemType;
//   label: string;
//   id: string;
//   isRequired: boolean;
//   name: string;
// }

// interface FormItemTextLabel extends FormItemBase {
//   type: "textLabel";
//   fontSize?: number;
//   fontWeight?: "light" | "bold";
//   textColor?: string;
//   align?: "left" | "center" | "right";
//   width?: number;
// }

// interface FormItemText extends FormItemBase {
//   type: "text" | "email" | "number";
// }

// interface FormItemCheckbox extends FormItemBase {
//   type: "check_box";
// }

// interface FormItemRadioButton extends FormItemBase {
//   type: "radio_button";
//   radioBtnItems: { label: string; value: string; id: string; name: string }[];
// }

// interface FormItemDropdown extends FormItemBase {
//   type: "drop_down";
//   menuItems: { label: string; value: string; id: string; name: string }[];
// }

// interface FormItemRow extends FormItemBase {
//   type: "row";
//   childrenConfig: FormItem[];
//   gap?: number;
// }

// interface FormItemAddress extends FormItemBase {
//   type: "address";
//   addressConfig: {
//     area: { label: string; placeHolder: string; name: string };
//     city: { label: string; placeHolder: string; name: string };
//     country: { label: string; placeHolder: string; name: string };
//     line1: { label: string; placeHolder: string; name: string };
//     line2: { label: string; placeHolder: string; name: string };
//     state: { label: string; placeHolder: string; name: string };
//     zip: { label: string; placeHolder: string; name: string };
//   };
// }

// type FormItem =
//   | FormItemTextLabel
//   | FormItemText
//   | FormItemCheckbox
//   | FormItemRadioButton
//   | FormItemDropdown
//   | FormItemRow
//   | FormItemAddress;

// import { z } from "zod";

// // Helper function to generate a basic text input schema
// const generateTextSchema = (item: FormItemText): z.ZodString => {
//   let schema = z.string();
//   if (item.isRequired) {
//     schema = schema.min(1, `${item.label} is required`);
//   }
//   return schema;
// };

// // Helper function to generate an email schema
// const generateEmailSchema = (item: FormItemText): z.ZodString => {
//   let schema = z.string().email(`${item.label} must be a valid email`);
//   if (item.isRequired) {
//     schema = schema.min(1, `${item.label} is required`);
//   }
//   return schema;
// };

// // Helper function to generate a number schema
// const generateNumberSchema = (item: FormItemText): z.ZodNumber => {
//   let schema = z.number();
//   if (item.isRequired) {
//     schema = schema.min(1, `${item.label} is required`);
//   }
//   return schema;
// };

// // Helper function for checkbox inputs
// const generateCheckboxSchema = (item: FormItemCheckbox): z.ZodBoolean => {
//   return z.boolean().refine((value) => value === true, {
//     message: `${item.label} is required`,
//   });
// };

// // Helper function for radio button inputs
// const generateRadioButtonSchema = (item: FormItemRadioButton): z.ZodString => {
//   return z.string().refine((value) => value === item.radioBtnItems[0].value, {
//     message: `${item.label} is invalid`,
//   });
// };

// // Helper function for dropdown menu items
// const generateDropdownSchema = (item: FormItemDropdown): z.ZodString => {
//   return z.string().min(1, `Please select a ${item.label}`);
// };

// // Helper function for address fields
// const generateAddressSchema = (item: FormItemAddress): z.ZodObject<any> => {
//   const addressConfig = item.addressConfig;
//   const schema = {
//     area: z.string().min(1, "Area is required"),
//     city: z.string().min(1, "City is required"),
//     country: z.string().min(1, "Country is required"),
//     line1: z.string().min(1, "Address Line 1 is required"),
//     line2: z.string().min(1, "Address Line 2 is required"),
//     state: z.string().min(1, "Region is required"),
//     zip: z.string().min(1, "Zip Code is required"),
//   };
//   return z.object(schema);
// };

// // Helper function to generate the schema for each field type
// const getSchemaForFieldType = (item: FormItem): z.ZodTypeAny => {
//   switch (item.type) {
//     case "text":
//     case "textLabel":
//       return generateTextSchema(item as FormItemText);
//     case "email":
//       return generateEmailSchema(item as FormItemText);
//     case "number":
//       return generateNumberSchema(item as FormItemText);
//     case "check_box":
//       return generateCheckboxSchema(item as FormItemCheckbox);
//     case "radio_button":
//       return generateRadioButtonSchema(item as FormItemRadioButton);
//     case "drop_down":
//       return generateDropdownSchema(item as FormItemDropdown);
//     case "address":
//       return generateAddressSchema(item as FormItemAddress);
//     default:
//       return z.unknown(); // For any unknown type
//   }
// };

// export const schemaGenerator = (formItems: FormItem[]): z.ZodObject<any> => {
//   const shape: Record<string, z.ZodTypeAny> = {};

//   formItems.forEach((item) => {
//     if (!item.name) {
//       console.warn(`Skipping item without name:`, item);
//       return; // Skip any items without a name
//     }

//     if (item.type === "row" && (item as FormItemRow).childrenConfig) {
//       // If it's a row with children, recursively handle the childrenConfig
//       const row = item as FormItemRow;
//       row.childrenConfig.forEach((childItem) => {
//         if (childItem.name) {
//           shape[childItem.name] = getSchemaForFieldType(childItem);
//         } else {
//           console.warn(`Skipping child item without name:`, childItem);
//         }
//       });
//     } else {
//       // Otherwise, just handle the current item
//       shape[item.name] = getSchemaForFieldType(item);
//     }
//   });

//   return z.object(shape);
// };
