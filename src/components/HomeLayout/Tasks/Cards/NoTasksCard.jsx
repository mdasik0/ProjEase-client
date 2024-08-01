
const NoTasksCard = () => {
    return (
        <div className="task_cards bg-gray-300 flex flex-col gap-4 items-center justify-center text-center p-3 mt-3 h-[174px] pt-3 px-2 rounded-xl cursor-pointer">
            <h1 className="text-2xl">No Tasks Available</h1>
            <p className="text-gray-600">
              Please check back later or look in other sections for tasks.
            </p>
          </div>
    );
};

export default NoTasksCard;