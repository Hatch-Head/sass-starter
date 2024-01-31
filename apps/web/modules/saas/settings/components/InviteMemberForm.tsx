"use client";

import { Button, Select, SelectItem, TextInput } from "@acme/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@saas/auth/hooks";
import { apiClient } from "@shared/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@ui/components";
import { useToast } from "@ui/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  role: z.enum(["MEMBER", "OWNER"]),
});

type FormValues = z.infer<typeof formSchema>;

export function InviteMemberForm({ teamId }: { teamId: string }) {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const { teamRole } = useUser();
  const inviteMemberMutation = apiClient.team.inviteMember.useMutation();

  const roleOptions = [
    {
      label: t("settings.team.members.roles.member"),
      value: "MEMBER",
    },
    {
      label: t("settings.team.members.roles.owner"),
      value: "OWNER",
    },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "MEMBER",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await inviteMemberMutation.mutateAsync({
        ...values,
        teamId,
      });
      router.refresh();
      form.reset();

      toast({
        title: t(
          "settings.team.members.inviteMember.notifications.success.title",
        ),
        description: t(
          "settings.team.members.inviteMember.notifications.success.description",
        ),
        variant: "success",
      });
    } catch {
      toast({
        title: t(
          "settings.team.members.inviteMember.notifications.error.title",
        ),
        description: t(
          "settings.team.members.inviteMember.notifications.error.description",
        ),
        variant: "error",
      });
    }
  };

  if (teamRole !== "OWNER") return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("settings.team.members.inviteMember.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="@container">
            <div className="@md:flex-row flex flex-col gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextInput
                          label={t("settings.team.members.inviteMember.email")}
                          {...field}
                          data-1p-ignore
                          autoCapitalize="none"
                          autoComplete="none"
                          inputMode="email"
                          error={form.formState.errors.email}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          label={t("settings.team.members.inviteMember.role")}
                          className="w-[120px]"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          {roleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t pt-3">
              <Button type="submit" loading={form.formState.isSubmitting}>
                {t("settings.team.members.inviteMember.submit")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
