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
import { createWardrobeItem } from "../../../action";
import BrandsDropdown from "../../../components/BrandsDropdown";
import SizeDropdown from "../../../components/SizeDropdown";
import WardrobeImageUploader from "../../../components/wardrobe-items/WardrobeImageUploader";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { WardrobeInventoryWarnType } from "../../../wardrobe.types";
import WearTypeDropdown from "../../../components/wardrobe-items/WearTypeDropdown";

const addItemSchema = z.object({
  brand: z.object({
    label: z.string(),
    value: z.string(),
  }),
  size: z.object({
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

const defaultValues: AddItemFields = {
  brand: { label: "", value: "" },
  size: { label: "", value: "" },
  images: [],
  purchaseDate: undefined as unknown as Date,
  purchasePrice: undefined as unknown as number,
  wearType: {
    label: "Never Worn",
    value: WardrobeInventoryWarnType.never_worn,
  },
};

interface AddWardrobeItemProps {
  token: string;
  memberId: string;
}

const MemberAddWardrobeItem: React.FC<AddWardrobeItemProps> = (props) => {
  const { token, memberId } = props;

  const { close, isOpen, open } = useToggle();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AddItemFields>({
    resolver: zodResolver(addItemSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (data: AddItemFields) =>
      createWardrobeItem(token, {
        brand: data?.brand?.value,
        familyMember: memberId,
        photos: data?.images,
        purchaseDate: data?.purchaseDate?.toISOString(),
        purchasePrice: data?.purchasePrice,
        wearType: data?.wearType?.value,
        size: data?.size?.value,
      }),
    onSuccess: () => {
      router.refresh();
      close();
      reset();
    },
    onError: (error) => {
      console.error("Failed to add wardrobe item:", error);
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
                  onChange={(selected) => field.onChange(selected)}
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
                  onChange={(selected) => field.onChange(selected)}
                  selectedOption={field.value}
                  onBlur={field.onBlur}
                  error={errors.brand?.message}
                  isSearchable
                  isPortal
                  token={token}
                />
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row [&>*]:w-full">
            <Input
              {...register("purchasePrice", { valueAsNumber: true })}
              error={errors?.purchasePrice?.message}
              label="Purchase Price"
              type="number"
              rightElement={<Icon name="pound" iconType="stroke" />}
            />
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row [&>*]:w-full">
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
            <Button
              size="md"
              type="submit"
              isLoading={isSubmitting || mutation.isPending}
            >
              Add item
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default MemberAddWardrobeItem;
