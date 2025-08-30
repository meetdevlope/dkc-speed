"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import DatePicker from "components/datepicker/DatePicker";
import Dialog from "components/Dialog";
import Icon from "components/icon/Icon";
import { Input } from "components/Input";
import TextArea from "components/TextArea";
import { useToggle } from "hooks/useToggle";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createEvent } from "../../../action";
import FamilyMembersDropdown from "../../../components/FamilyMembersDropdown";
import WardrobeImageUploader from "../../../components/wardrobe-items/WardrobeImageUploader";

const addEventSchema = z.object({
  familyMember: z.object({
    label: z.string(),
    value: z.string(),
  }),
  eventTitle: z.string().min(1, "Event title is required"),
  description: z.string().optional(),
  journalDate: z.date(),
  photos: z.array(z.string()).min(1, "Please upload at least one image"),
});

type AddEventFields = z.infer<typeof addEventSchema>;

interface AddEventProps {
  token: string;
  productId: string;
}

const AddProductEvent: React.FC<AddEventProps> = ({ token, productId }) => {
  const { isOpen, open, close } = useToggle();
  const route = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddEventFields>({
    resolver: zodResolver(addEventSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: AddEventFields) =>
      createEvent(token, {
        eventTitle: data?.eventTitle,
        productId,
        photos: data?.photos,
        familyMember: data?.familyMember?.value,
        description: data?.description || "",
        journalDate: data?.journalDate?.toISOString(),
      }),
    onSuccess: () => {
      route.refresh();
      close();
      reset();
    },
    onError: (error) => {
      console.error("Failed to create event:", error);
    },
  });

  const onSubmit: SubmitHandler<AddEventFields> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <Button
        size="md"
        startIcon={<Icon name="plus" className="stroke-2" iconType="stroke" />}
        variant="outline"
        onClick={open}
      >
        Add Journal
      </Button>
      <Dialog isOpen={isOpen} onClose={close} title="Add Journal" noClose>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div className="flex flex-col gap-x-4 gap-y-2 md:flex-row">
            <Controller
              name="familyMember"
              control={control}
              render={({ field }) => (
                <FamilyMembersDropdown
                  label="Family Member"
                  onChange={(selected) => field.onChange(selected)}
                  selectedOption={field.value}
                  onBlur={field.onBlur}
                  error={errors.familyMember?.message}
                  isSearchable
                  isPortal
                  token={token}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-x-4 gap-y-2 md:flex-row [&>*]:w-full">
            <Input
              {...register("eventTitle")}
              error={errors?.eventTitle?.message}
              label="Event Title"
            />
            <Controller
              name="journalDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Journal Date"
                  selected={field.value}
                  onChange={field.onChange}
                  showYearPicker
                />
              )}
            />
          </div>
          <Controller
            name="photos"
            control={control}
            render={({ field }) => (
              <WardrobeImageUploader
                onImagesChange={field.onChange}
                initialImages={field.value}
                error={errors.photos?.message}
              />
            )}
          />
          <TextArea
            label="Description (optional)"
            placeholder="Please add description"
            {...register("description")}
            error={Boolean(errors?.description?.message)}
          />
          <div className="my-4 flex justify-end gap-x-2">
            <Button size="md" type="button" onClick={close} variant="outline">
              Cancel
            </Button>
            <Button size="md" type="submit" isLoading={mutation.isPending}>
              Create Journal
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AddProductEvent;
