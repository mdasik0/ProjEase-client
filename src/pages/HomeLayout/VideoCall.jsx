import { useEffect, useState } from "react";
import Sidebar from "../../components/Shared/Sidebar";

const VideoCall = () => {
  const [nothing, setnothing] = useState(null);
  const something = [
    {
      id: 1,
      title: "i am no 1",
      status: "pending",
    },
    {
      id: 2,
      title: "i am no 2",
      status: "pending",
    },
    {
      id: 3,
      title: "i am no 3",
      status: "pending",
    },
    {
      id: 4,
      title: "i am no 4",
      status: "pending",
    },
    {
      id: 5,
      title: "i am no 5",
      status: "pending",
    },
  ];

  useEffect(() => {
    setnothing(something);
  }, []);

  const handleDelete = (id) => {
    const filter = nothing?.find((x) => x.id === id);

    if (filter) {
        const statusUpdate = { ...filter, status: "active" };

        // Create a new array with the updated object
        const updatedNothing = nothing.map((item) => 
            item.id === id ? statusUpdate : item
        );

        // Update the state
        setnothing(updatedNothing);
    }
};

  useEffect(() => {
  }, [nothing]);

  const pending = nothing?.filter((y) => y.status === "pending");
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full flex gap-4 items-center justify-center">
        {pending?.map((i) => (
          <div className="bg-green-500 w-fit" key={i.id}>
            <h1>{i.title}</h1>
            <button onClick={() => handleDelete(i.id)} className="bg-red-500">
              done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCall;
