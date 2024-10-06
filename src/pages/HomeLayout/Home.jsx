import Companies from "../../components/HomeLayout/Homepage/Companies";
import Footer from "../../components/HomeLayout/Homepage/Footer";
import Header from "../../components/HomeLayout/Homepage/Header";
import Navbar from "../../components/HomeLayout/Homepage/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Companies />
      <Footer />
    </>
  );
};

export default Home;