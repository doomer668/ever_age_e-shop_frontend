import React from "react";
import { Hero } from "@/components/Hero/Hero";
import { ProductsSection } from "@/components/ProductSection/ProductSection";
import Collaborations from "@/components/Collaborations/Collaborations";
import { Footer } from "@/components/Footer/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ProductsSection />
      <Collaborations />
      <Footer />
    </>
  );
};

export default HomePage;
