"use client";

import { PasswordInput } from "@acme/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionBlock } from "@saas/shared/components";
import { apiClient } from "@shared/lib";
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

  const changePasswordMutation = apiClient.auth.changePassword.useMutation({
    onSuccess: () => {
      toast({
        title: t("settings.notifications.passwordUpdated"),
      });
      reset();
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: error.message,
      });
    },
  });

  const onHandleSubmit = (data) =>
    changePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

  return (
    <ActionBlock
      title={t("settings.account.changePassword.title")}
      onSubmit={handleSubmit(onHandleSubmit)}
      isSubmitting={changePasswordMutation.isLoading}
      //isSubmitDisabled={!password || password.length < 8}
    >
      <PasswordInput
        label="Current password"
        className="max-w-sm"
        {...register("currentPassword")}
        error={errors.currentPassword?.message as string}
      />
      <PasswordInput
        label="New password"
        className="max-w-sm"
        {...register("newPassword")}
        error={errors.newPassword?.message as string}
      />
      <PasswordInput
        label="Confirm password"
        className="max-w-sm"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message as string}
      />
    </ActionBlock>
  );
}
