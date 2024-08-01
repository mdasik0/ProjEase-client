import { useRef, useEffect } from "react";

const AnimatedParagraph = ({ show, detailsText }) => {
  const paragraphRef = useRef();

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (show && paragraph) {
      paragraph.classList.remove("hidden");
      paragraph.classList.add("block");

      const paragraphText = paragraph.innerText;
      paragraph.innerHTML = "";
      // this for loop will get to all the letter in the paragraph text ex: "h", 'e', 'l', 'l', 'o', like this 
      for (let i = 0; i < paragraphText.length; i++) {
        // next a span element/tag will be created
        const span = document.createElement("span");
        // in this span tag as the loop goes on each letter will be added individually as innertext
        span.innerText = paragraphText[i];
        // letter class will be added to add the letter apearing animation
        span.classList.add("letter");
        // a animation delay will be added to make sure the speed the animation appers on the screen
        span.style.animationDelay = `${i * 0.006}s`;
        // atleast the span element will be appended in the live code
        paragraph.appendChild(span);
      }
    }
  }, [show]);

  return (
    <p ref={paragraphRef} className="text-center duration-1000 hidden">
      {detailsText}
    </p>
  );
};

export default AnimatedParagraph;
