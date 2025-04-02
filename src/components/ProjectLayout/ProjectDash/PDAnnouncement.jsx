import { useEffect, useState } from "react";
import { FaExpand, FaPlus } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Modal from "../../Shared/Modal";
import { useSelector } from "react-redux";
import { useGetAnnouncementQuery, usePostAnnouncementMutation } from "../../../redux/api/projectsApi";
import toast from "react-hot-toast";

const PDAnnouncement = () => {
  const { projectData } = useSelector(state => state.projectSlice);
  const { userData } = useSelector(state => state.userSlice);
  
  // Add refetch function from useGetAnnouncementQuery
  const { 
    data: announcements = [], 
    refetch: refetchAnnouncements 
  } = useGetAnnouncementQuery(projectData?._id);
  
  const [announcementsIndex, setAnnouncementsIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAddAnnModal, setOpenAddAnnModal] = useState(false);
  const [inputInfo, setInputInfo] = useState({
    title: "",
    content: "",
    author: null,
    date: new Date().toLocaleDateString("en-GB"),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    projectId: projectData?._id || null,
  });

  const [postAnnouncement] = usePostAnnouncementMutation();

  useEffect(() => {
    if (projectData?._id) {
      setInputInfo(prev => ({ 
        ...prev, 
        projectId: projectData._id 
      }));
    }
    if (userData?.name) {
      setInputInfo(prev => ({ 
        ...prev, 
        author: `${userData.name.firstname} ${userData.name.lastname}` 
      }));
    }
  }, [projectData, userData]);

  useEffect(() => {
    // Reset index when announcements change
    setAnnouncementsIndex(announcements.length > 0 ? announcements.length - 1 : 0);
  }, [announcements]);

  const showPrevAnnouncement = () => {
    setAnnouncementsIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const showNextAnnouncement = () => {
    setAnnouncementsIndex(prevIndex => Math.min(prevIndex + 1, announcements.length - 1));
  };

  const handleCreateAnnouncement = async () => {
    try {
      if (!inputInfo.projectId) {
        toast.error("Project ID is missing!");
        return;
      }
      
      const response = await postAnnouncement(inputInfo);
      
      if (response.data?.success) {
        toast.success("Announcement Created Successfully!");
        handleCloseModal();
        // Manually refetch announcements after successful creation
        refetchAnnouncements();
      } else {
        toast.error("Failed to create announcement!");
      }
    } catch (error) {
      toast.error("An error occurred while creating announcement");
    }
  };

  const handleCloseModal = () => {
    setInputInfo({
      title: "",
      content: "",
      author: userData?.name ? `${userData.name.firstname} ${userData.name.lastname}` : null,
      date: new Date().toLocaleDateString("en-GB"),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      projectId: projectData?._id || null,
    });
    setOpenAddAnnModal(false);
  };

  const currentAnnouncement = announcements[announcementsIndex] || {};

  if (!projectData?._id) {
    return <div className="bg-gray-200 rounded-lg p-4 w-full">Loading project data...</div>;
  }

  return (
    <div className="bg-gray-200 rounded-lg py-3 ps-3 pe-2 flex-grow max-w-[460px]">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-[500]">Announcement</h3>
        <button
          onClick={() => setOpenAddAnnModal(true)}
          disabled={!projectData?._id}
          className={`cursor-pointer flex items-center gap-2 bg-[#1a1a1a] text-white p-2 px-4 rounded-full text-sm ${
            !projectData?._id ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Add <FaPlus className="text-xs" />
        </button>
      </div>

      {announcements.length === 0 ? (
        <div className="mt-4 p-4 bg-white rounded-lg text-center">
          No announcements available
        </div>
      ) : (
        <>
          <div className="nav flex justify-between items-center mt-3">
            <button
              onClick={showPrevAnnouncement}
              className={`cursor-pointer flex items-center bg-[#1a1a1a] text-white p-2 px-4 rounded-full text-sm ${
                announcementsIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={announcementsIndex === 0}
            >
              <MdArrowBackIos />
              Prev
            </button>
            
            <div className="bg-gray-300 flex gap-3 p-3 rounded-lg">
              <span className="flex items-center gap-2 text-sm font-[500]">
                <LuCalendarDays className="text-lg" />
                {currentAnnouncement.date}
              </span>
              <span className="flex items-center gap-2 text-sm font-[500]">
                <IoMdTime className="text-lg" />
                {currentAnnouncement.time}
              </span>
            </div>
            
            <button
              onClick={showNextAnnouncement}
              className={`cursor-pointer flex items-center gap-1 bg-[#1a1a1a] text-white p-2 px-4 rounded-full text-sm ${
                announcementsIndex === announcements.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={announcementsIndex === announcements.length - 1}
            >
              Next
              <MdArrowForwardIos />
            </button>
          </div>

          <div className="relative mt-4">
            <div className="bg-white h-[205px] p-3 rounded-lg relative">
              <span className="absolute top-2 right-2 text-sm text-gray-500">
                {announcementsIndex + 1}/{announcements.length}
              </span>
              <h2 className="text-xl font-[500] -mb-1">
                {currentAnnouncement.title?.length > 35
                  ? `${currentAnnouncement.title.slice(0, 35)}...`
                  : currentAnnouncement.title}
              </h2>
              <span className="text-sm text-gray-500">
                By {currentAnnouncement.author}
              </span>
              <p className="text-black">
                {currentAnnouncement.content?.length > 250
                  ? `${currentAnnouncement.content.slice(0, 220)}...`
                  : currentAnnouncement.content}
              </p>
              <button
                title="Expand"
                className="absolute bottom-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={() => setIsModalOpen(true)}
              >
                <FaExpand size={20} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add Announcement Modal */}
      <Modal isOpen={openAddAnnModal} setIsOpen={setOpenAddAnnModal}>
        <div className="p-3">
          <h3 className="text-lg font-[500]">Make an Announcement</h3>
          <input
            value={inputInfo.title}
            onChange={(e) => setInputInfo({ ...inputInfo, title: e.target.value })}
            className="p-3 text-sm border border-gray-300 w-full rounded-lg mb-4"
            type="text"
            placeholder="Enter a Title"
          />
          <textarea
            value={inputInfo.content}
            onChange={(e) => setInputInfo({ ...inputInfo, content: e.target.value })}
            className="p-3 text-sm border border-gray-300 w-full rounded-lg mb-4"
            placeholder="Enter your Announcement."
          />
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleCreateAnnouncement}
              className="px-5 py-2.5 bg-green-500 text-white rounded-lg"
            >
              Create
            </button>
            <button
              onClick={handleCloseModal}
              className="px-5 py-2.5 bg-red-500 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Announcement Detail Modal */}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-gray-300 p-4">
          <h2 className="text-xl font-[500]">{currentAnnouncement.title}</h2>
          <p className="text-sm text-gray-500">
            By {currentAnnouncement.author} | {currentAnnouncement.date} at {currentAnnouncement.time}
          </p>
          <div className={`bg-white p-3 rounded-lg mt-3 ${
            currentAnnouncement.content?.length > 200 ? "h-[400px] overflow-y-auto" : ""
          }`}>
            <p className="text-black">{currentAnnouncement.content}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PDAnnouncement;