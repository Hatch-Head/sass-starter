import { Button } from "@react-email/components";
import { PropsWithChildren } from "react";

export default function PrimaryButton({
  href,
  children,
}: PropsWithChildren<{
  href: string;
}>) {
  return (
    <Button
      pX={20}
      pY={12}
      href={href}
      className="cursor-pointer rounded-md bg-blue-500 text-white hover:bg-blue-700"
    >
      {children}
    </Button>
  );
}
