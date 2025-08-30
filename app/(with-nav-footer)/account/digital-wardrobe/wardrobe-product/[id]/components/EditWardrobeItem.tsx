"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import DatePicker from "components/datepicker/DatePicker";
import Dialog from "components/Dialog";
import Icon from "components/icon/Icon";
import { Input } from "components/Input";
import { useToggle } from "hooks/useToggle";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { editWardrobeItem } from "../../../action";
import BrandsDropdown from "../../../components/BrandsDropdown";
import FamilyMembersDropdown from "../../../components/FamilyMembersDropdown";
import SizeDropdown from "../../../components/SizeDropdown";
import WardrobeImageUploader from "../../../components/wardrobe-items/WardrobeImageUploader";
import { useEffect } from "react";
import { WardrobeInventoryWarnType } from "../../../wardrobe.types";
import WearTypeDropdown from "../../../components/wardrobe-items/WearTypeDropdown";
import { wearTypeMapper } from "utils/mappers";

const editItemSchema = z.object({
  brand: z.object({
    label: z.string(),
    value: z.string(),
  }),
  size: z.object({
    label: z.string(),
    value: z.string(),
  }),
  familyMember: z.object({
    label: z.string(),
    value: z.string(),
  }),
  images: z.array(z.string()).min(1, "Please upload at least one image"),
  purchasePrice: z.number().min(1, "Please enter Purchase Price"),
  purchaseDate: z.date(),
  wearType: z.object({
    label: z.string(),
    value: z.nativeEnum(WardrobeInventoryWarnType),
  }),
});

type EditItemFields = z.infer<typeof editItemSchema>;

interface EditWardrobeItemProps {
  token: string;
  item: {
    id: string;
    brand: { label: string; value: string };
    size: { label: string; value: string };
    familyMember: { label: string; value: string };
    images: string[];
    purchasePrice: number;
    purchaseDate: string;
    wearType?: WardrobeInventoryWarnType;
  };
}

const EditWardrobeItem: React.FC<EditWardrobeItemProps> = ({ token, item }) => {
  const { isOpen, open, close } = useToggle();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditItemFields>({
    resolver: zodResolver(editItemSchema),
    defaultValues: {
      brand: item?.brand,
      size: item?.size,
      familyMember: item?.familyMember,
      images: item?.images,
      purchasePrice: item?.purchasePrice,
      purchaseDate: new Date(item?.purchaseDate),
      wearType: {
        label: "Never Worn",
        value: WardrobeInventoryWarnType.never_worn,
      },
    },
  });

  const mutation = useMutation({
    mutationFn: (data: EditItemFields) =>
      editWardrobeItem(token, item.id, {
        brand: data.brand.value,
        size: data.size.value,
        familyMember: data.familyMember.value,
        photos: data.images,
        purchasePrice: data.purchasePrice,
        purchaseDate: data.purchaseDate.toISOString(),
        wearType: data.wearType?.value,
      }),
    onSuccess: () => {
      reset();
      close();
      router.refresh();
    },
    onError: (error) => {
      console.error("Failed to edit item:", error);
    },
  });

  const onSubmit: SubmitHandler<EditItemFields> = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        brand: item.brand,
        size: item.size,
        familyMember: item.familyMember,
        images: item.images,
        purchasePrice: item.purchasePrice,
        purchaseDate: new Date(item.purchaseDate),
        wearType: {
          label: wearTypeMapper[item?.wearType as WardrobeInventoryWarnType],
          value: item?.wearType,
        },
      });
    }
  }, [item, reset, isOpen]);

  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        onClick={open}
        startIcon={<Icon name="edit" iconType="stroke" size={16} />}
      >
        Edit
      </Button>

      <Dialog
        isOpen={isOpen}
        onClose={close}
        title="Edit Wardrobe Item"
        noClose
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div className="flex flex-col gap-x-4 gap-y-2 md:flex-row">
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <BrandsDropdown
                  label="Brand"
                  onChange={field.onChange}
                  selectedOption={field.value}
                  onBlur={field.onBlur}
                  error={errors.brand?.value?.message}
                  isSearchable
                  isPortal
                />
              )}
            />
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <SizeDropdown
                  label="Size"
                  onChange={field.onChange}
                  selectedOption={field.value}
                  onBlur={field.onBlur}
                  error={errors.size?.value?.message}
                  isSearchable
                  isPortal
                  token={token}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-x-4 gap-y-2 md:flex-row [&>*]:w-full">
            <Controller
              name="familyMember"
              control={control}
              render={({ field }) => (
                <FamilyMembersDropdown
                  label="Family Member"
                  onChange={field.onChange}
                  selectedOption={field.value}
                  onBlur={field.onBlur}
                  error={errors.familyMember?.value?.message}
                  isSearchable
                  isPortal
                  token={token}
                />
              )}
            />
            <Input
              {...register("purchasePrice", { valueAsNumber: true })}
              error={errors.purchasePrice?.message}
              label="Purchase Price"
              type="number"
              rightElement={<Icon name="pound" iconType="stroke" />}
            />
          </div>
          <div className="flex flex-col gap-x-4 gap-y-2 md:flex-row [&>*]:w-full">
            <Controller
              name="purchaseDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Purchase Date"
                  selected={field.value}
                  onChange={field.onChange}
                  showYearPicker
                />
              )}
            />
            <Controller
              name="wearType"
              control={control}
              render={({ field }) => (
                <WearTypeDropdown
                  label="Wear Type"
                  onChange={field.onChange}
                  selectedOption={field.value}
                  isSearchable
                  isPortal
                />
              )}
            />
          </div>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <WardrobeImageUploader
                onImagesChange={field.onChange}
                initialImages={field.value}
                error={errors.images?.message}
              />
            )}
          />
          <div className="my-4 flex justify-end gap-x-2">
            <Button size="md" type="button" onClick={close} variant="outline">
              Cancel
            </Button>
            <Button size="md" type="submit" isLoading={mutation.isPending}>
              Save changes
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default EditWardrobeItem;
