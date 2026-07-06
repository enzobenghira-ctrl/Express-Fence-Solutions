import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import PhoneStrip from "@/components/sections/PhoneStrip";
import WhyWPC from "@/components/sections/WhyWPC";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import Expansion from "@/components/sections/Expansion";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileCTABar from "@/components/ui/MobileCTABar";

export default function Home() {
  return (
    <>
      <Navbar />
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
      <Footer />
      <WhatsAppButton />
      <MobileCTABar />
    </>
  );
}
