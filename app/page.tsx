import Choose from "@/components/ChooseUs";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RecentJob from "@/components/RecentJob";

export default function Home() {
  return (
    <section>
      <div>
        <Navbar />
      </div>

      <div>
        <Hero />
      </div>

      <div>
        <Choose />
      </div>

      <div>
        <RecentJob />
      </div>
    </section>
  );
}
