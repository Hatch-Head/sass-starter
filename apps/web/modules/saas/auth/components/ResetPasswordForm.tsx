"use client";

import { Button, PasswordInput } from "@acme/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@shared/lib";
import { useToast } from "@ui/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z
  .object({
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
    token: z.string().min(1),
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

type ResetPasswordFormValues = z.infer<typeof schema>;

const ResetPasswordForm = ({ token }: { token: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: resetPassword } = apiClient.auth.resetPassword.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    resetPassword(data, {
      onSuccess: () => {
        toast({ variant: "success", title: "Password reset successfully" });
        router.push("/");
      },
      onError: (error) => {
        toast({ variant: "error", title: error.message });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordInput
        label="New Password"
        {...register("newPassword")}
        error={errors.newPassword}
        data-testid="input-newPassword"
      />
      <PasswordInput
        label="Confirm Password"
        {...register("confirmPassword")}
        error={errors.confirmPassword}
        data-testid="input-confirmPassword"
      />
      <Button type="submit">Reset Password</Button>
    </form>
  );
};

export default ResetPasswordForm;
