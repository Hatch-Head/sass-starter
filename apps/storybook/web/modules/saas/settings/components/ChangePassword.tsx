"use client";

import { Button, PasswordInput } from "@acme/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@shared/lib";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components";
import { useToast } from "@ui/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

export function ChangePasswordForm() {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();

  const schema = z
    .object({
      currentPassword: z.string().min(8),
      newPassword: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .superRefine(({ newPassword, confirmPassword }, ctx) => {
      if (newPassword !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate: changePasswordMutation, isLoading } =
    apiClient.auth.changePassword.useMutation({
      onSuccess: () => {
        toast({
          title: t("settings.notifications.passwordUpdated"),
          variant: "success",
        });
        reset();
        router.refresh();
      },
      onError: (error) => {
        toast({
          title: error.message,
          variant: "error",
        });
      },
    });

  const onSubmit = (data) =>
    changePasswordMutation({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>{t("settings.account.changePassword.title")}</CardTitle>
        </CardHeader>

        <CardContent>
          <PasswordInput
            label="Current password"
            className="max-w-sm"
            {...register("currentPassword")}
            autoComplete="password"
            data-testid="input-current-password"
            error={errors.currentPassword?.message as string}
          />
          <PasswordInput
            label="New password"
            className="max-w-sm"
            {...register("newPassword")}
            autoComplete="none"
            data-testid="input-new-password"
            error={errors.newPassword?.message as string}
          />
          <PasswordInput
            label="Confirm password"
            className="max-w-sm"
            {...register("confirmPassword")}
            autoComplete="none"
            data-testid="input-confirm-password"
            error={errors.confirmPassword?.message as string}
          />
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            data-testid="button-password-save"
            loading={isLoading}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
