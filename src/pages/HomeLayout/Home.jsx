import Companies from "../../components/HomeLayout/Homepage/Companies";
import Features from "../../components/HomeLayout/Homepage/Features";
import Footer from "../../components/HomeLayout/Homepage/Footer/Footer";
import Header from "../../components/HomeLayout/Homepage/Header";
import Navbar from "../../components/HomeLayout/Homepage/Navbar/Navbar";
import WhyChooseProjease from "../../components/HomeLayout/WhyChooseProjease";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Companies />
      <WhyChooseProjease />
      <Features />
      <Footer />
    </>
  );
};

export default Home;