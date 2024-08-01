import { useState } from "react";
import AnimatedParagraph from "./AnimatedParagraph";

const CardAnimationMain = () => {
  const [showParagraph, setShowParagraph] = useState(false);

  const mouseEntered = () => {
    const header = document.querySelector(".header-styling");
    const headerText = document.querySelector(".header-text");
    header.classList.add("header-hover");
    header.classList.add("fake-cursor");

    setTimeout(() => {
      headerText.classList.add("opacity-0");
    }, 2200);
    setTimeout(() => {
      headerText.classList.add("hidden");
      setShowParagraph(true);
    }, 2600);
  };

  return (
      <div>
        {/* animation container */}
        <div
          onMouseEnter={mouseEntered}
          className="w-[330px] h-[550px] bg-green-500 flex items-center justify-center overflow-hidden relative"
        >
          <h1 className="text-5xl header-styling">
            <span className="header-text">Hello</span>
          </h1>
          {showParagraph && (
            <div className="h-full overflow-x-auto flex flex-col gap-3 p-6">
              <AnimatedParagraph
                show={showParagraph}
                detailsText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ut quasi
              maxime dolorum distinctio provident sit excepturi corporis maiores ullam."
              />
              <AnimatedParagraph
                show={showParagraph}
                detailsText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ut quasi
              maxime dolorum distinctio provident sit excepturi corporis maiores ullam."
              />
              <div className="mt-6">
                <AnimatedParagraph
                  show={showParagraph}
                  detailsText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ut quasi
              maxime dolorum distinctio provident sit excepturi corporis maiores ullam."
                />
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default CardAnimationMain;
