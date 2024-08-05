import Navbar from "./(sections)/navbar";
import HeroSection from "@/views/hero-section";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
