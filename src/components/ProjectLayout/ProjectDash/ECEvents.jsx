
const ECEvents = () => {

    const events = [
        {
          _id: 1,
          title: "Lorem ipsum dolor",
          time: "12:00 PM - 2:00 PM",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          _id: 2,
          title: "Lorem ipsum dolor",
          time: "12:00 PM - 2:00 PM",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          _id: 3,
          title: "Lorem ipsum dolor",
          time: "12:00 PM - 2:00 PM",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
      ];
      
    return (
        <div className="ps-4 pe-2 mt-3">
            <h3 className="text-lg font-[500]">Events</h3>
            <div className="flex flex-col gap-3 mt-3 h-[245px] overflow-y-auto pr-2 pb-3">
                {/* eventCards */}
                {events.map((event) => (
                    <div key={event._id} className="bg-white border border-gray-300 border-t-4 odd:border-t-teal-500 even:border-t-purple-500 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                        <h4 className="font-[500]">{event.title}</h4>
                        <p className="text-xs text-gray-400">{event.time}</p>
                        </div>
                        <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ECEvents;