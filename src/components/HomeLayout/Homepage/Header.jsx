import headerImage from "/header-img/header-img-save-file-comp.png";
import star from "/header-img/star.png";
const Header = () => {
  return (
    <header className="flex justify-between items-center md:flex-row flex-col-reverse max-w-[90vw] mx-auto md:my-10 md:gap-10 gap-6">
      <div className=" lg:w-[500px] md:text-start text-center">
        <h1 className="lg:text-6xl text-4xl leading-[50px] font-bold lg:leading-[80px]">
          <span className="flex items-center md:justify-start justify-center gap-4">
            Simplify <img className="lg:w-10 md:w-6 lg:h-10 md:h-6" src={star} alt="star img" />
          </span>{" "}
          Your Project <p>Management .</p>
        </h1>
        <p className=" lg:my-6 md:my-4 mt-2 mb-6 md:text-base text-sm text-gray-600 ">ProjEase lets you manage all your projects in one place. With built-in tasks, chat, and video calls, there’s no need to switch between tools.</p>
        <div className=" p-1 rounded-full bg-gray-200 text-sm flex items-center">
          <input className="px-3 py-2 bg-transparent flex-grow focus:outline-none" type="email" placeholder="Enter your email" />
          <button className="uppercase text-white px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] duration-500 rounded-full">Get Started</button>
        </div>
      </div>

      <img className="md:w-5/12 " src={headerImage} alt="header img" />
    </header>
  );
};

export default Header;
