import Companies from "../../components/HomeLayout/Homepage/Companies";
import Features from "../../components/HomeLayout/Homepage/Features";
import Footer from "../../components/HomeLayout/Homepage/Footer/Footer";
import Header from "../../components/HomeLayout/Homepage/Header";
import Navbar from "../../components/HomeLayout/Homepage/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Companies />
      <Features />
      <Footer />
    </>
  );
};

export default Home;