import Companies from "../../components/HomeLayout/Homepage/Companies";
import Features from "../../components/HomeLayout/Homepage/Features";
import Footer from "../../components/HomeLayout/Homepage/Footer/Footer";
import Header from "../../components/HomeLayout/Homepage/Header";
import Navbar from "../../components/HomeLayout/Homepage/Navbar/Navbar";
import Testimonials from "../../components/HomeLayout/Homepage/Testimonials";
import WhyChooseProjease from "../../components/HomeLayout/Homepage/WhyChooseProjease";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Companies />
      <WhyChooseProjease />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;