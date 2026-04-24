import Navbar from "@/components/Navbar";
import LatestJob from "./component/LatestJob";
import CTA from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Jobs() {
    return (
        <section>
            <div>
                <Navbar />
            </div>

            <div>
                <LatestJob />
            </div>

            <div>
                <CTA />
            </div>

            <div>
                <Footer />
            </div>
        </section>
    )
}