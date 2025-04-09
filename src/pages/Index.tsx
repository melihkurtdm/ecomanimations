
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Themes from "@/components/Themes";
import Pricing from "@/components/Pricing";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Themes />
      <Pricing />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
