import Navbar from "@/components/Navbar";
import AboutUS from "./components/AboutUs";
import WeDo from "./components/WeDo";
import CTA from "@/components/Cta";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <section>
      <div>
        <Navbar />
      </div>

      <div>
        <AboutUS />
      </div>

      <div>
        <WeDo />
      </div>

      <div>
        <CTA />
      </div>

      <div>
        <Footer />
      </div>
    </section>
  );
}
