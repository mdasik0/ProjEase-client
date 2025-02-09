import WhyChooseProjeaseImg from "../../../public/why-choose-us/projease-why-choose-us-image.png";
import ReasonsCard from "./Homepage/ReasonsCard";
const WhyChooseProjease = () => {
  return (
    <section className="max-w-[90vw] mx-auto my-24 flex justify-between items-center pl-20">
      <div className="WCP-img-sec flex flex-col items-start w-1/2">
        <img className="scale-110" src={WhyChooseProjeaseImg} alt="" />
      </div>
      <div className="WCP-main-sec w-1/2">
        <h1 className="text-5xl font-[500]">Why Choose Projease?</h1>
        <p className="wcp-main-sec-title text-sm text-gray-500 w-full my-6">
          Choosing the right project management tool is crucial for team
          success. ProjEase combines all your task management tools in one
          place. Here is why you should choose projease as your team management
          tool
        </p>
        <h4 className="text-lg font-[500] mb-1">Reasons : </h4>
        <div className="cards-container text-sm">
          <ReasonsCard
            index={"01"}
            description={
              "All the project management tools you need in one application, so you can stay focused without switching between multiple platforms."
            }
          >
            <div className="flex items-center gap-6 justify-start h-full w-fit -600">
              <div className="flex flex-col items-start ">
                <div className="flex items-start gap-2 relative">
                  <p className="text-5xl">All</p>{" "}
                  <p className="text-gray-500">tools</p>
                  <p className="text-5xl absolute -right-1.5 top-[18px]">In</p>
                </div>
                <div className="flex  items-start -mt-2">
                  <p className="text-3xl">One</p>
                  <p className="text-gray-500 m-1 mt-5">Place</p>
                </div>
              </div>
            </div>
          </ReasonsCard>
          <ReasonsCard
            index={"02"}
            description={
              "Create, assign, and update tasks with ease. Stay on top of deadlines with clear progress tracking and automated reminders to keep your projects moving forward."
            }
          >
            <div className="flex flex-col">
              <h1 className="text-4xl text-gray-400">Easy</h1>
              <h1 className="text-4xl -mt-3 -ml-1">Task</h1>
              <p className="text-lg text-gray-400 -mt-3 ml-1">Tracking</p>
            </div>
          </ReasonsCard>
          <ReasonsCard
            index={"03"}
            description={
              "Stay connected with your team through instant updates, live edits, and real-time notifications. Work together seamlessly without delays or miscommunication."
            }
          >
            <div className="flex flex-col">
              <h1 className="text-3xl">
                Real<span className="text-gray-400">-</span>
              </h1>
              <h1 className="text-3xl -mt-3">Time</h1>
              <h1 className="text-3xl -mt-3 text-gray-400">Sync</h1>
            </div>
          </ReasonsCard>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseProjease;
