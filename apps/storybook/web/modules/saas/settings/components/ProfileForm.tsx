"use client";

import { Button, TextInput } from "@acme/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@saas/auth/hooks";
import { apiClient } from "@shared/lib";
import {
  AnalyticsTrackError,
  AnalyticsTrackEvent,
} from "../../../../app/libs/analytics";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components";
import { useToast } from "@ui/hooks";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
});

const ProfileForm = () => {
  const { toast } = useToast();
  const t = useTranslations();

  const { reloadUser, user } = useUser();
  const userAttributes = user ? Object.values(user) : [];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  useEffect(() => {
    if (user?.name) {
      reset({ name: user.name }, { keepDirty: false });
    }
  }, [...userAttributes, user]);

  const { mutate: changeNameMutation, isLoading } =
    apiClient.auth.changeName.useMutation({
      onSuccess: async () => {
        AnalyticsTrackEvent("PROFILE_UPDATED");
        toast({
          variant: "success",
          title: t("settings.notifications.nameUpdated"),
        });
        await reloadUser();
      },
      onError: (error) => {
        AnalyticsTrackError("PROFILE_UPDATED", error);
        toast({
          variant: "error",
          title: t("settings.notifications.nameUpdateFailed"),
        });
      },
    });

  const onSubmit = (data) => changeNameMutation(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <TextInput
            label={t("settings.account.changeName.title")}
            {...register("name")}
            className="max-w-sm"
            error={errors.name?.message as string}
            data-1p-ignore
            data-testid="input-name"
          />
        </CardContent>

        <CardFooter>
          <Button
            type="button"
            disabled={!isDirty}
            variant={"outline"}
            onClick={() => reset()}
            data-testid="button-profile-cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isDirty}
            loading={isLoading}
            data-testid="button-profile-save"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProfileForm;
