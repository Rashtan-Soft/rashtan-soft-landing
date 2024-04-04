export const metadata = {
  title: "Rashtan Soft",
  description:
    "Software development agency specializing in C#, React, and Node.js."
};

import Hero from "@/components/hero";
import Features from "@/components/features";
import Newsletter from "@/components/newsletter";
import Zigzag from "@/components/zigzag";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Zigzag />
      <Testimonials />
      // <Newsletter />
    </>
  );
}
