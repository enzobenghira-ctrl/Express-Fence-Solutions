import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/sections/Hero";
import PhoneStrip from "@/components/sections/PhoneStrip";
import WhyWPC from "@/components/sections/WhyWPC";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import Expansion from "@/components/sections/Expansion";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SiteShell transparentHeader>
      <main>
        <Hero />
        <PhoneStrip />
        <Products />
        <WhyWPC />
        <About />
        <Gallery />
        <Testimonials />
        <Expansion />
        <Contact />
      </main>
    </SiteShell>
  );
}
