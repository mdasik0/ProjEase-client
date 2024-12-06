import { TiWarning } from "react-icons/ti";

const FailedToLoadDataCard = () => {
    return (
        <div className="task_cards bg-red-400 text-white flex flex-col gap-4 items-center justify-center text-center p-5 h-[200px] pt-3 px-2 rounded-xl cursor-pointer">
            <TiWarning className="text-6xl" />
            <h1 className="text-2xl">Unable to Load The Data</h1>
            <p className="text-gray-200">
              Please check back later or refresh the page.
            </p>
          </div>
    );
};

export default FailedToLoadDataCard;