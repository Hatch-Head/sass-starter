import {
  Container,
  Font,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { PropsWithChildren } from "react";
import { Logo } from "./Logo";

export default function Wrapper({ children }: PropsWithChildren) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind>
        <Section className="bg-gray-100 p-8">
          <Container className="max-w-lg rounded-lg border border-solid border-gray-200 bg-white p-6 text-gray-800 shadow-2xl">
            <Logo />
            {children}
          </Container>

          <Container className="max-w-lg py-6  text-gray-500">
            <Text className="text-xs">
              Copyright ACME {new Date().getFullYear()} <br />
              123 Fake St, Brisbane Australia
            </Text>
          </Container>
        </Section>
      </Tailwind>
    </Html>
  );
}
