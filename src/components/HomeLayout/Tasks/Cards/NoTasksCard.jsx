
const NoTasksCard = () => {
    return (
        <div className="task_cards bg-gray-300 flex flex-col gap-4 items-center justify-center text-center p-3 h-[200px] pt-3 px-2 rounded-xl cursor-pointer">
            <h1 className="text-2xl">No Tasks Available</h1>
            <p className="text-gray-600">
            Add new tasks to keep your project moving.
            </p>
          </div>
    );
};

export default NoTasksCard;