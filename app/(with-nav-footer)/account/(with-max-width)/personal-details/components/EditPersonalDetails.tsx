"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import Dialog from "components/Dialog";
import ImageUploader from "components/ProfileUploader";
import { Input } from "components/Input";
import { useToggle } from "hooks/useToggle";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { EditPersonalDetailsReq, User } from "types/user.types";
import { z } from "zod";
import { editUserDetails } from "../action";
import PhoneInput from "components/PhoneInput";

const dropdownOptionSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

type EditPersonalDetailsProps = {
  token: string;
  userData: User;
};

const editPersonalDetails = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  phoneNumber: dropdownOptionSchema,
  profile: z.string().optional(),
});

type PersonalDetailsForm = z.infer<typeof editPersonalDetails>;

const EditPersonalDetails: React.FC<EditPersonalDetailsProps> = (props) => {
  const { userData, token } = props;

  const { open, close, isOpen } = useToggle();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<PersonalDetailsForm>({
    resolver: zodResolver(editPersonalDetails),
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phoneNumber: {
        label: "",
        value: `${userData?.countryCode || "+44"}:${userData?.phoneNumber || ""}`,
      },
    },
  });

  const { mutateAsync: mutateEditUser, isPending } = useMutation({
    mutationFn: (req: EditPersonalDetailsReq) => editUserDetails(token, req),
    onSuccess: () => {
      toast.success("Details edited successfully.");
      close();
      router.refresh();
    },
    onError: (error) => {
      console.error("Error while editing user mutation:", error.message);
      toast.error("Could not edit details. Try again!");
    },
  });

  const handleImageUploaded = (imageUrl: string): void => {
    setValue("profile", imageUrl, { shouldDirty: true });
  };

  const handleSubmitForm: SubmitHandler<PersonalDetailsForm> = async (data) => {
    const { phoneNumber, firstName, lastName, profile } = data;
    const [countryCode, phoneNumberSplit] = phoneNumber.value.split(":");

    try {
      // console.log(countryCode, rest, phoneNumberSplit);
      await mutateEditUser({
        countryCode,
        firstName,
        lastName,
        phoneNumber: phoneNumberSplit,
        profile,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disableSubmit = useMemo(() => {
    if (!isDirty) {
      return true;
    }
    return false;
  }, [isDirty]);

  const handleDiscard = () => {
    close();
    resetForm();
  };

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={open}>
        Edit
      </Button>
      <Dialog
        isOpen={isOpen}
        title="Edit Personal Details"
        onClose={close}
        noClose
      >
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-4 pb-3"
        >
          <Input
            label="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            label="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <PhoneInput
                onChange={field.onChange}
                value={field.value}
                label="Phone number"
              />
            )}
          />

          <ImageUploader
            onImageUploaded={handleImageUploaded}
            maxSizeInMB={10}
            label="Profile photo"
          />
          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={handleDiscard}
            >
              Discard
            </Button>
            <Button
              disabled={disableSubmit}
              size="md"
              type="submit"
              isLoading={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default EditPersonalDetails;
