import { Newsletter } from "@app/[locale]/(marketing)/(home)/Newsletter";
import { Features } from "./Features";
import { Hero } from "./Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Newsletter />
    </>
  );
}