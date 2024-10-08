import {
  FaFacebookSquare,
  FaGooglePlusG,
  FaInstagram,
  FaPinterestSquare,
  FaYoutube,
} from "react-icons/fa";
import fullLogo from "../../../../../public/logo/Full-logo/logo-black-ov2.png";
import { FaXTwitter } from "react-icons/fa6";
import Newsletter from "./Newsletter";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <section className="footer w-full flex flex-col gap-0">
      <Newsletter />
      <footer className="bg-[#1a1a1a] text-white w-full flex flex-col gap-0">
        <div className="max-w-[90vw] mx-auto w-full md:py-16 p-10 border-b-4 border-gray-500 flex md:flex-row flex-col items-start  md:gap-10 gap-6">
          <FooterCompanyInfo />
          <FooterImportantLinks />
          <FooterOverview />
          <FooterResource />
          <FooterSocialLinks />
        </div>

        <FooterBottom />
      </footer>
    </section>
  );
};

export default Footer;

export const FooterSocialLinks = () => {
  return (
    <div className="md:w-1/5 w-full montserrat md:text-start text-center">
      <h4 className="font-[500] my-4 uppercase text-gray-400 ">Follow</h4>
      <ul className="flex md:justify-start justify-center gap-4 text-lg">
        <li className="cursor-pointer hover:text-gray-400 duration-500">
          <FaFacebookSquare />
        </li>
        <li className="cursor-pointer hover:text-gray-400 duration-500">
          <FaXTwitter />
        </li>
        <li className="cursor-pointer hover:text-gray-400 duration-500">
          <FaPinterestSquare />
        </li>
        <li className="cursor-pointer hover:text-gray-400 duration-500">
          <FaYoutube />
        </li>
        <li className="cursor-pointer hover:text-gray-400 duration-500">
          <FaGooglePlusG />
        </li>
        <li className="cursor-pointer hover:text-gray-400 duration-500">
          <FaInstagram />
        </li>
      </ul>
    </div>
  );
};

export const FooterResource = () => {
  return <div className="md:w-1/5 w-full montserrat md:text-start text-center">
  <h4 className="font-[500] my-4 uppercase text-gray-400 ">
    resource
  </h4>
  <ul className="flex flex-col gap-1">
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Community
    </li>
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Feedback
    </li>
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Updates
    </li>
  </ul>
</div>
}

export const FooterOverview = () => {
  return <div className="md:w-1/5 w-full montserrat md:text-start text-center">
  <h4 className="font-[500] my-4 uppercase text-gray-400 ">
    Feature Overview
  </h4>
  <ul className="flex flex-col gap-1">
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Chats
    </li>
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Video Call
    </li>
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Tasks
    </li>
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      User Dashboard
    </li>
  </ul>
</div>
}

export const FooterImportantLinks = () => {
  return <div className="md:w-1/5 w-full montserrat md:text-start text-center">
  <h4 className="font-[500] my-4 uppercase text-gray-400 ">
    ProjEase
  </h4>
  <ul className="flex flex-col gap-1">
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Home
    </li>
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      About
    </li>
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Projects
    </li>
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Blog
    </li>
    <li className="cursor-pointer hover:text-gray-400 duration-500">
      Contact
    </li>
  </ul>
</div>
}

export const FooterCompanyInfo = () => {
  return <div className="logo-description md:w-1/5 w-full md:text-start text-center">
  <div className="logo">
    <img
      className="h-10 w-full object-contain md:object-left  mb-4"
      src={fullLogo}
      alt="projease full logo"
    />
  </div>
  <p className="description montserrat">
    1025 Evergreen Terrace <br />
    Springfield, IL 62704 <br />
    United States
  </p>
  <p className="montserrat mt-4">projease@gmail.com</p>
</div>
}