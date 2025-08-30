"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/Button";
import DatePicker from "components/datepicker/DatePicker";
import Dialog from "components/Dialog";
import Icon from "components/icon/Icon";
import { Input } from "components/Input";
import { useToggle } from "hooks/useToggle";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import BrandsDropdown from "../BrandsDropdown";
import FamilyMembersDropdown from "../FamilyMembersDropdown";
import SizeDropdown from "../SizeDropdown";
import WardrobeImageUploader from "./WardrobeImageUploader";
import { createWardrobeItem } from "../../action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { WardrobeInventoryWarnType } from "../../wardrobe.types";
import WearTypeDropdown from "./WearTypeDropdown";

const addItemSchema = z.object({
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

type AddItemFields = z.infer<typeof addItemSchema>;

interface AddWardrobeItemProps {
  token: string;
}

const AddWardrobeItem: React.FC<AddWardrobeItemProps> = ({ token }) => {
  const { close, isOpen, open } = useToggle();

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddItemFields>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      wearType: {
        label: "Never Worn",
        value: WardrobeInventoryWarnType.never_worn,
      },
    },
  });

  const mutation = useMutation({
    mutationFn: (data: AddItemFields) =>
      createWardrobeItem(token, {
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
      queryClient.invalidateQueries({
        queryKey: ["wardrobe-items"],
      });
    },
    onError: (error) => {
      console.error("Failed to add item:", error);
    },
  });

  const onSubmit: SubmitHandler<AddItemFields> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <Button
        size="sm"
        startIcon={<Icon name="plus" className="stroke-2" iconType="stroke" />}
        variant="outline"
        onClick={open}
        startIconContainerClassName="mr-0 md:mr-2"
      >
        <span className="hidden md:block">Add item</span>
      </Button>
      <Dialog isOpen={isOpen} onClose={close} title="Add Wardrobe Item" noClose>
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
                  error={errors.brand?.message}
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
                  error={errors.size?.message}
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
                  error={errors.familyMember?.message}
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
              Add item
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AddWardrobeItem;
