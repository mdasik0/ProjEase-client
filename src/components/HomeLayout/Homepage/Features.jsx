import lightbulbIcon from "/feature-cards-icons/lightbulb.png"
import tasksIcon from "/feature-cards-icons/tasks.png"
import chatIcon from "/feature-cards-icons/chat.png"
import videoCallIcon from "/feature-cards-icons/video-call.png"
const Features = () => {
    return (
        <div className="max-w-[90vw] mx-auto my-10 flex flex-col items-center justify-center">
            <p className="font-[500] mb-8 text-gray-500">Features</p>
            <h1 className="text-5xl font-semibold">Powerful Features to Elevate Your Workflow</h1>
            <p className="text-sm w-1/2 mt-8 text-center">Explore advance tools that helps you make smarter decisions, track progress and manage your tasks with ease. Stay organized and in control with Features designed to enhance your Productivity.</p>
            <div className="feature-cards-container grid grid-cols-4 gap-10 mt-14 mb-10">
                <div className="card-1 w-80 h-60  p-6 rounded-xl border hover:border-red-300 hover:bg-red-100 cursor-pointer duration-500">
                    <div className="icon bg-gray-100 w-14 h-14 rounded-lg">
                        <img src={lightbulbIcon} alt="make smart decisions icon" className="h-full w-full object-contain" />
                    </div>
                    <h1 className="feature-card-title text-xl font-[500] mt-6">
                        Make Smart Decisions
                    </h1>
                    <p className="feature-card-subtitle mt-4 text-sm">
                        Get realtime insights, reports and alerts to help you make more informed decisions
                    </p>
                </div>
                <div className="card-1 w-80 h-60  p-6 rounded-xl border hover:border-red-300 hover:bg-red-100 cursor-pointer duration-500">
                    <div className="icon bg-gray-100 w-14 h-14 rounded-lg">
                        <img src={tasksIcon} alt="manage your tasks icon" className="h-full w-full p-1 object-contain" />
                    </div>
                    <h1 className="feature-card-title text-xl font-[500] mt-6">
                        Tasks Management
                    </h1>
                    <p className="feature-card-subtitle mt-4 text-sm">
                        Easily manage your tasks, deadlines and priorities to keep project running smoothly
                    </p>
                </div>
                <div className="card-1 w-80 h-60  p-6 rounded-xl border hover:border-red-300 hover:bg-red-100 cursor-pointer duration-500">
                    <div className="icon bg-gray-100 w-14 h-14 rounded-lg">
                        <img src={chatIcon} alt="team chat icon" className="h-full w-full object-contain" />
                    </div>
                    <h1 className="feature-card-title text-xl font-[500] mt-6">
                        Team Chat
                    </h1>
                    <p className="feature-card-subtitle mt-4 text-sm">
                        Stay connected with real-time messaging, making team collaboration easier
                    </p>
                </div>
                <div className="card-1 w-80 h-60  p-6 rounded-xl border hover:border-red-300 hover:bg-red-100 cursor-pointer duration-500">
                    <div className="icon bg-gray-100 w-14 h-14 rounded-lg">
                        <img src={videoCallIcon} alt="video call icon" className="h-full w-full object-contain p-2" />
                    </div>
                    <h1 className="feature-card-title text-xl font-[500] mt-6">
                        Video Chat
                    </h1>
                    <p className="feature-card-subtitle mt-4 text-sm">
                    Connect instantly with clear video and seamless communication for better collaboration
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default Features;