import Navbar from "@/components/navbar";
import HeroSection from "@/views/hero-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col relative">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
