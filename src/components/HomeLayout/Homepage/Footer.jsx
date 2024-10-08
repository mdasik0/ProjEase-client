import { FaFacebookSquare, FaGooglePlusG, FaInstagram, FaPinterestSquare, FaYoutube } from "react-icons/fa";
import fullLogo from "../../../../public/logo/Full-logo/logo-black-ov2.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="footer w-full flex flex-col gap-0">
      <div className="newsletter uppercase bg-no-repeat bg-cover bg-center py-10 w-full flex md:flex-row flex-col justify-center items-center gap-10">
        <p className="text-white">Subscribe to our weekly newsletter</p>
        <div className=" p-1 rounded-full bg-gray-100 ">
          <input
            className="px-3 py-2 bg-transparent w-[300px]"
            type="email"
            placeholder="Enter your email"
          />
          <button className="uppercase text-white px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] duration-500 rounded-full">
            Subscribe
          </button>
        </div>
      </div>
      <footer className="bg-[#1a1a1a] text-white w-full flex flex-col gap-0">
        <div className="max-w-[90vw] mx-auto w-full py-10 border-b-2 border-stone-800 flex items-start gap-10">
          <div className="logo-description w-1/5">
            <div className="logo">
              <img
                className="h-10 mb-4"
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
          <div className="w-1/5 montserrat">
            <h4 className="font-[500] my-4 uppercase ">ProjEase</h4>
            <ul className="flex flex-col gap-1">
              <li>Home</li>
              <li>About</li>
              <li>Projects</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="w-1/5 montserrat">
            <h4 className="font-[500] my-4 uppercase ">Feature Overview</h4>
            <ul className="flex flex-col gap-1">
              <li>Chats</li>
              <li>Video Call</li>
              <li>Tasks</li>
              <li>User Dashboard</li>
            </ul>
          </div>
          <div className="w-1/5 montserrat">
            <h4 className="font-[500] my-4 uppercase ">resource</h4>
            <ul className="flex flex-col gap-1">
              <li>Community</li>
              <li>Feedback</li>
              <li>Updates</li>
            </ul>
          </div>
          <div className="w-1/5 montserrat">
            <h4 className="font-[500] my-4 uppercase ">Follow</h4>
            <ul className="flex gap-4 text-lg">
              <li><FaFacebookSquare /></li>
              <li><FaXTwitter /></li>
              <li><FaPinterestSquare /></li>
              <li><FaYoutube /></li>
              <li><FaGooglePlusG /></li>
              <li><FaInstagram /></li>

            </ul>
          </div>
        </div>

        <div className="bg-stone-800 px-[5vw] mx-auto w-full">hellow</div>
      </footer>
    </section>
  );
};

export default Footer;
