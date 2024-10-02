import headerImage from "../../../../public/header-img/header-img-save-file-comp.png";
import star from "../../../../public/header-img/star.png";
const Header = () => {
  return (
    <header className="flex justify-between items-center max-w-[90vw] mx-auto mt-10">
      <div>
        <h1 className="text-6xl font-bold leading-[80px]">
          <span className="flex items-center gap-4">
            Simplify <img className="w-10 h-10" src={star} alt="star img" />
          </span>{" "}
          Your Project <p>Management .</p>
        </h1>
        <p className="w-7/12 my-6 text-gray-600">ProjEase lets you manage all your projects in one place. With built-in tasks, chat, and video calls, there’s no need to switch between tools.</p>
        <div className="flex bg-white rounded-full p-[2px] w-6/12 border border-gray-300">
          <input className="flex-grow px-3 focus:outline-none bg-transparent " type="email" placeholder="Enter your email" />
          <button className="bg-[#1a1a1a]  text-white px-4 py-2 rounded-full" type="submit">Get Started </button>
        </div>
      </div>

      <img className="w-5/12" src={headerImage} alt="header img" />
    </header>
  );
};

export default Header;
