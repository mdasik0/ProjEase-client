
const Newsletter = () => {
    return (
        <div className="newsletter uppercase bg-no-repeat bg-cover bg-center py-10 w-full flex md:flex-row flex-col justify-center items-center md:gap-10 gap-4">
        <p className="text-white">Subscribe to our weekly newsletter</p>
        <div className=" p-1 rounded-full bg-gray-100 flex items-center">
          <input
            className="px-3 py-2 bg-transparent md:w-[300px]"
            type="email"
            placeholder="Enter your email"
          />
          <button className="uppercase text-white px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] duration-500 rounded-full">
            Subscribe
          </button>
        </div>
      </div>
    );
};

export default Newsletter;