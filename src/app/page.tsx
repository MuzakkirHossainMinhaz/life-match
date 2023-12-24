import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className=" min-h-screen w-full bg-[url('https://www.womenbuildingaustralia.com.au/sites/default/files/images/Poly_BG_Grad%20%281%29_0_1.png')] bg-no-repeat bg-cover py-1">
      <div className=" px-1 max-w-screen-2xl mx-auto ">
        <Navbar />
        <div>
          <Hero />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
