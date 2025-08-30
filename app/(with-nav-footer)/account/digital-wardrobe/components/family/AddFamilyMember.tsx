"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import TanStack Query hooks
import { Button } from "components/Button";
import DatePicker from "components/datepicker/DatePicker";
import Dialog from "components/Dialog";
import { Input } from "components/Input";
import CustomSelect, { DropdownOption } from "components/Select";
import { useToggle } from "hooks/useToggle";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createFamilyMember } from "../../action"; // Assuming this is the API call

const addFamilyMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.object({
    label: z.string(),
    value: z.string(),
  }),
  birthdate: z.date(),
});

type AddFamilyMemberFields = z.infer<typeof addFamilyMemberSchema>;

interface AddFamilyMemberProps {
  token: string;
  children: ReactNode;
}

const AddFamilyMember: React.FC<AddFamilyMemberProps> = (props) => {
  const { token, children } = props;
  const { close, isOpen, open } = useToggle();
  const route = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: AddFamilyMemberFields) =>
      createFamilyMember(token, {
        name: data.name,
        gender: data.gender.value,
        birthDate: data.birthdate.toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["family-members"],
      });
      route.refresh();
      close();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<AddFamilyMemberFields>({
    resolver: zodResolver(addFamilyMemberSchema),
  });

  const onSubmit: SubmitHandler<AddFamilyMemberFields> = async (data) => {
    try {
      await mutation.mutateAsync(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={open} className="contents">
        {children}
      </button>

      <Dialog isOpen={isOpen} onClose={close} title="Add Family Member" noClose>
        <form className="flex flex-col gap-y-2">
          <Input
            {...register("name")}
            label="Name"
            placeholder="Enter name"
            error={errors.name?.message}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field: { value, onChange } }) => {
              const selectedOption =
                typeof value === "object"
                  ? {
                      label: (value as DropdownOption)?.label,
                      value: (value as DropdownOption)?.value,
                    }
                  : {
                      label: value,
                      value: value,
                    };

              return (
                <CustomSelect
                  options={genderOptions}
                  onChange={onChange}
                  selectedOption={selectedOption}
                  label="Gender"
                />
              );
            }}
          />
          <Controller
            name="birthdate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Birthdate"
                selected={field.value}
                onChange={field.onChange}
                showYearPicker
              />
            )}
          />
          <div className="mt-4 flex justify-end gap-x-2">
            <Button size="md" type="button" onClick={close} variant="outline">
              Cancel
            </Button>
            <Button
              size="md"
              type="button"
              isLoading={mutation.isPending || isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Create
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AddFamilyMember;

export const genderOptions: DropdownOption[] = [
  {
    label: "Boy",
    value: "boy",
  },
  {
    label: "Girl",
    value: "girl",
  },
  {
    label: "Other",
    value: "other",
  },
];
