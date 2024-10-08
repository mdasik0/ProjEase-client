
const FooterBottom = () => {
    return (
        <div className="bg-[#2a2a2a] px-[5vw] mx-auto w-full py-8 flex md:flex-row flex-col gap-6 justify-between items-center">
          <ul className="uppercase flex items-center gap-10 montserrat font-[500]">
            <li>Terms & Conditions</li>
            <li>Privacy policy</li>
            <li>Sitemap</li>
          </ul>
          <p className="text-xs md:text-start text-center text-[#b1b1b1] leading-[18px]">Copyright 2024 @ Projease Company <br /> website by <a className="underline" href="">Md Asik</a></p>
        </div>
    );
};

export default FooterBottom;