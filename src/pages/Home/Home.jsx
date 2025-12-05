import Banner from "../../components/Home/Banner";
import LatestBooks from "./LatestBooks";
import CoverageMap from "./CoverageMap";
import WhyChooseUs from "./WhyChooseUs";
import FaqSection from "./FaqSection";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Banner />
      <LatestBooks />
      <WhyChooseUs />
      <CoverageMap />
      <FaqSection />
      <Newsletter />
    </div>
  );
};

export default Home;
