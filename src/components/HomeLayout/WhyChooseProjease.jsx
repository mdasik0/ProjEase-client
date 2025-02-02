import WhyChooseProjeaseImg from "../../../public/why-choose-us/projease-why-choose-us-image.png";
const WhyChooseProjease = () => {
  const features = [
    {
      title: "Easy Task Tracking",
      desc: "Assign, update, and track tasks effortlessly.",
      icon: "✅",
    },
    {
      title: "Secure & Fast Communication",
      desc: "Encrypted chat and high-quality video calls.",
      icon: "🔒",
    },
    {
      title: "Seamless Integration",
      desc: "Works with your favorite tools.",
      icon: "🔗",
    },
  ];
  return (
    <section className="max-w-[90vw] bg-blue-100 mx-auto my-32 flex justify-between items-center">
      <div className="WCP-img-sec flex flex-col items-start w-1/2">
        <img className="scale-110" src={WhyChooseProjeaseImg} alt="" />
      </div>
      <div className="WCP-main-sec w-1/2">
        <h1 className="text-5xl font-[500]">Why Choose Projease?</h1>
        <p className="wcp-main-sec-title w-full my-6">
          Choosing the right project management tool is crucial for team
          success. ProjEase combines all your task management tools in one place. Here is why you should choose projease as your team management tool
        </p>
        <h4 className="text-lg font-[500] mb-1">Reasons : </h4>
        <div className="cards-container text-sm">

          <div className="the-card flex items-start gap-1 mb-3 ">
            <div className="front">
              <span>📁</span>
              <h4 className="title"></h4>
            </div>
            <div className="back">
              <p>
                All the project management tools you need in one application, so
                you can stay focused without switching between multiple
                platforms.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-1 mb-3">
            <span>⚡</span>
            <p>
              Stay connected with your team through instant updates, live edits,
              and real-time notifications. Work together seamlessly without
              delays or miscommunication.
            </p>
          </div>
          <div className="flex items-start gap-1 mb-3">
            <span>✅</span>
            <p>
              Create, assign, and update tasks with ease. Stay on top of
              deadlines with clear progress tracking and automated reminders to
              keep your projects moving forward.
            </p>
          </div>
          <div className="flex items-start gap-1">
            <span>🔒</span>
            <p>
              Communicate with confidence using end-to-end encrypted messaging
              and crystal-clear video calls. Keep your team connected while
              ensuring privacy and security at all times.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseProjease;
