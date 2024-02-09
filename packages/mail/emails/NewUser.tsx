import { Heading, Link, Text } from "@react-email/components";
import globals from "global-config";
import PrimaryButton from "./components/PrimaryButton";
import Wrapper from "./components/Wrapper";

export function NewUser({
  url,
  name,
  otp,
}: {
  url: string;
  name: string;
  otp: string;
}): JSX.Element {
  return (
    <Wrapper>
      <Heading className="text-xl">
        Welcome to <span className="text-gray-400">{globals.appName}</span>
      </Heading>

      <Text>Click the link below to activate your account. 🚀</Text>

      <PrimaryButton data-testid="button-activate" href={url}>
        Active account &rarr;
      </PrimaryButton>

      <Text className="text-muted-foreground text-sm">
        If you want to open the link in a different browser than your default
        one, copy and paste this link:
        <Link href={url}>{url}</Link>
      </Text>
    </Wrapper>
  );
}

NewUser.subjects = {
  en: "Welcome to ACME!",
  de: "Willkommen bei ACME!",
};

export default NewUser;
