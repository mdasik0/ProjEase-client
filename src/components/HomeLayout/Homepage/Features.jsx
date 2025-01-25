import lightbulbIcon from "/feature-cards-icons/lightbulb.png";
import tasksIcon from "/feature-cards-icons/tasks.png";
import chatIcon from "/feature-cards-icons/chat.png";
import videoCallIcon from "/feature-cards-icons/video-call.png";
import FeatureCard from "./FeatureCard";
const Features = () => {
  
  return (
    <div className="max-w-[90vw] mx-auto my-10 flex flex-col items-center justify-center">
      <p className="font-[500] mb-8 text-gray-500">Features</p>
      <h1 className="text-5xl font-semibold">
        Powerful Features to Elevate Your Workflow
      </h1>
      <p className="text-sm w-1/2 mt-8 text-center">
        Explore advance tools that helps you make smarter decisions, track
        progress and manage your tasks with ease. Stay organized and in control
        with Features designed to enhance your Productivity.
      </p>
      <div className="feature-cards-container grid grid-cols-4 gap-10 mt-14 mb-10">
        <FeatureCard
          title={"Make Smart Decisions"}
          subTitle={
            "Get realtime insights, reports and alerts to help you make more informed decisions"
          }
        >
          <img
            src={lightbulbIcon}
            alt="make smart decisions icon"
            className="h-full w-full object-contain"
          />
        </FeatureCard>
        <FeatureCard
          title={" Tasks Management"}
          subTitle={
            "Easily manage your tasks, deadlines and priorities to keep project running smoothly"
          }
        >
          <img
            src={tasksIcon}
            alt="manage your tasks icon"
            className="h-full w-full p-1 object-contain"
          />
        </FeatureCard>
        <FeatureCard
          title={"Team Chat"}
          subTitle={
            "Stay connected with real-time messaging, making team collaboration easier"
          }
        >
          <img
            src={chatIcon}
            alt="team chat icon"
            className="h-full w-full object-contain"
          />
        </FeatureCard>
        <FeatureCard
          title={"Video Chat"}
          subTitle={
            "Connect instantly with clear video and seamless communication for better collaboration"
          }
        >
          <img
            src={videoCallIcon}
            alt="video call icon"
            className="h-full w-full object-contain p-2"
          />
        </FeatureCard>
      </div>
    </div>
  );
};

export default Features;
