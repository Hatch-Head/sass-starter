import { Text } from "@react-email/components";
import Wrapper from "./components/Wrapper";

export function PasswordChange({ name }: { name: string }): JSX.Element {
  return (
    <Wrapper>
      <Text>Hi {name},</Text>

      <Text>
        Your password has just been changed. If this was not done by you, please
        contact us immediately.
      </Text>
    </Wrapper>
  );
}

PasswordChange.subjects = {
  en: "Password changed",
  // cspell:disable-next-line
  de: "Password geändert",
};

export default PasswordChange;
