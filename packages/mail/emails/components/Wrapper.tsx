import {
  Container,
  Font,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import globals from "global-config";
import { PropsWithChildren } from "react";
import config from "tailwind-config";
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
      <Tailwind
        config={{
          theme: {
            colors: { ...config.theme?.colors },
            borderRadius: { ...config.theme?.borderRadius },
            boxShadow: { ...config.theme?.boxShadow },
            fontFamily: { ...config.theme?.fontFamily },
            fontSize: { ...config.theme?.fontSize },
          },
        }}
      >
        <Section className="bg-gray-100 p-8">
          <Container className="max-w-lg rounded-lg border border-solid border-gray-200 bg-white p-6 text-gray-800 shadow-2xl">
            <Logo />
            {children}
          </Container>

          <Container className="max-w-lg py-3  text-gray-500">
            <Text className="text-xs">
              Copyright {globals.appName} {new Date().getFullYear()} <br />
              {globals.address}
            </Text>
          </Container>
        </Section>
      </Tailwind>
    </Html>
  );
}
