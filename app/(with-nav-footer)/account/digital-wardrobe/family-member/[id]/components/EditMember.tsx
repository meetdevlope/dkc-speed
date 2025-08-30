"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/Button";
import DatePicker from "components/datepicker/DatePicker";
import Dialog from "components/Dialog";
import { Input } from "components/Input";
import CustomSelect, { DropdownOption } from "components/Select";
import { useToggle } from "hooks/useToggle";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FamilyMember } from "../../../action";
import { genderOptions } from "../../../components/family/AddFamilyMember";
import { useMutation } from "@tanstack/react-query";
import { editFamilyMember } from "../actions";

const editFamilyMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.object({
    label: z.string(),
    value: z.string(),
  }),
  birthdate: z.date(),
});

type EditFamilyMemberFields = z.infer<typeof editFamilyMemberSchema>;

interface EditFamilyMemberProps {
  token: string;
  member: FamilyMember;
}

const EditMember: React.FC<EditFamilyMemberProps> = (props) => {
  const { token, member } = props;
  const { close, isOpen, open } = useToggle();
  const route = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditFamilyMemberFields>({
    resolver: zodResolver(editFamilyMemberSchema),
    defaultValues: {
      name: member.name,
      gender: {
        label:
          genderOptions.find((option) => option.value === member.gender)
            ?.label || member.gender,
        value: member.gender,
      },
      birthdate: new Date(member.birthDate),
    },
  });

  const mutation = useMutation({
    mutationFn: (data: EditFamilyMemberFields) =>
      editFamilyMember(token, member?._id, {
        name: data?.name,
        gender: data?.gender?.value,
        birthDate: data?.birthdate?.toISOString(),
      }),
    onSuccess: () => {
      route.refresh();
      close();
    },
    onError: (error) => {
      console.error("Failed to update family member:", error);
    },
  });

  const onSubmit: SubmitHandler<EditFamilyMemberFields> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <button
        onClick={open}
        className="cursor-pointer text-sm font-medium text-primary-500 underline"
      >
        Edit
      </button>
      <Dialog
        isOpen={isOpen}
        onClose={close}
        title="Edit Family Member"
        noClose
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
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
            <Button size="md" type="submit" isLoading={mutation.isPending}>
              Update
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default EditMember;
