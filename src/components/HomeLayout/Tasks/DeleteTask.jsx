import { IoTrashSharp } from "react-icons/io5";
import Modal from "../../Shared/Modal";
import { RxCross2 } from "react-icons/rx";
import { useDeleteTaskMutation } from "../../../redux/api/tasksApi";
import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const DeleteTask = ({ _id }) => {
  const [deleteTask] = useDeleteTaskMutation();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteTasks = async (e,_id) => {
      e.stopPropagation();
      console.log(_id);
    try {
        const response = await deleteTask(_id);
        if(response) {
            toast.success('Task deleted successfully')
        } else {
            toast.error('There was an error deleting the task. please try again')
        }
        
    } catch (error) {
        toast.error(error.message)
    }
    setOpenDeleteModal(false);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setOpenDeleteModal(false);
  };
  return (
    <>
      <button
        onClick={() => setOpenDeleteModal(true)}
        className="flex items-center gap-3 bg-red-500 text-white duration-300 hover:bg-red-400 font-semibold rounded-lg px-3 py-2.5 my-4 w-full"
      >
        <IoTrashSharp />{" "}
        <span className="font-normal text-sm">Delete task</span>
      </button>
      <Modal isOpen={openDeleteModal} setIsOpen={setOpenDeleteModal}>
        <div className="p-6"> 
          <h2 className="text-xl text-center my-4">
            Do you Want to Delete This Task ?
          </h2>
          <div className="flex gap-4">
            <button
              onClick={(e) => handleDeleteTasks(e,_id)}
              className="flex items-center justify-center gap-3 bg-red-500 text-white duration-300 hover:bg-red-400 font-semibold rounded-lg px-3 py-2.5 mt-4 w-full"
            >
              <IoTrashSharp /> Delete
            </button>
            <button
              onClick={(e) => closeModal(e)}
              className="flex items-center justify-center gap-2 bg-green-500 text-white duration-300 hover:bg-green-400 font-semibold rounded-lg px-3 py-2.5 mt-4 w-full"
            >
              <RxCross2 /> Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
DeleteTask.propTypes = {
    _id: PropTypes.string.isRequired, 
  };
  

export default DeleteTask;
