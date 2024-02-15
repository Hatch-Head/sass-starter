import ResetPasswordForm from "@saas/auth/components/ResetPasswordForm";

export default async ({ searchParams }) => {
  const { token } = searchParams;
  return <ResetPasswordForm token={token} />;
};
