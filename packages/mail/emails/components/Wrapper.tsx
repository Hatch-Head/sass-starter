import {
  Container,
  Font,
  Head,
  Html,
  Section,
  Tailwind,
} from "@react-email/components";
import { PropsWithChildren } from "react";

const tailwindConfig = require("tailwind-config");

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
      <Tailwind config={tailwindConfig}>
        <Section className="bg-card text-card-foreground p-8">
          <Container className="border-border rounded-lg border border-solid p-6">
            {children}
          </Container>
        </Section>
      </Tailwind>
    </Html>
  );
}
