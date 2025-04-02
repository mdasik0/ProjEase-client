import { useState } from "react";
import { FaExpand, FaPlus } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FiMaximize2 } from "react-icons/fi";
import Modal from "../../Shared/Modal";



const PDAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([
        { id: 1, title: "Title One", author: "Md Asik", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", date: "3/26/2025", time: "10:19 AM" },
        { id: 2, title: "lorem Lorem ipsum ", author: "Md Asik", content: "Another announcement content here.", date: "3/27/2025", time: "11:30 AM" },
        { id: 3, title: "Title Three", author: "Md Asik", content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere reprehenderit adipisci dolore tempore necessitatibus quo ea saepe vel quia doloremque blanditiis iusto voluptates neque, officiis magni maxime perspiciatis cum odio, non voluptas.", date: "3/28/2025", time: "1:00 PM" }
    ]);
    const [announcementsIndex, setAnnouncementsIndex] = useState(announcements.length - 1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openAddAnnModal, setOpenAddAnnModal] = useState(false);
    const [inputInfo, setInputInfo] = useState({
        title: "",
        content: "",
        date: new Date().toLocaleDateString("en-GB"), 
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
    });

    const showPrevAnnouncement = () => {
        setAnnouncementsIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            return newIndex >= 0 ? newIndex : prevIndex;
        });
    };

    const showNextAnnouncement = () => {
        setAnnouncementsIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            return newIndex < announcements.length ? newIndex : prevIndex;
        });
    };
    const handleCreateAnnouncement = () => {

    }
    const handleCancelCreationAnnouncement = () => {
        setInputInfo({
            title: "",
            content: "",
            date: new Date().toLocaleDateString("en-GB"),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        })
        setOpenAddAnnModal(false);
    }
    return (
        <div className="bg-gray-200 rounded-lg py-3 ps-3 pe-2 flex-grow max-w-[460px]">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-[500]">Announcement</h3>
                <button onClick={() => setOpenAddAnnModal(!openAddAnnModal)} className="cursor-pointer flex items-center gap-2 bg-[#1a1a1a] text-white p-2 px-4 rounded-full text-sm">Add <FaPlus className="text-xs" /></button>
                <Modal isOpen={openAddAnnModal} setIsOpen={setOpenAddAnnModal}>
                    <div className="p-3">
                        <h3 className="text-lg font-[500]">Make an Announcement</h3>
                            <input onChange={e => setInputInfo({...inputInfo, title: e.target.value})} className="p-3 text-sm border border-gray-300 w-full rounded-lg mb-4" type="text" placeholder="Enter an Title" />
                            <textarea onChange={e => setInputInfo({...inputInfo, content: e.target.value})}  className="p-3 text-sm border border-gray-300 w-full rounded-lg mb-4" type='text' placeholder="Enter your Announcement."></textarea>
                            <div className="flex gap-3 justify-end">
                            <button onClick={handleCreateAnnouncement} className="px-5 py-2.5 bg-green-500 text-white rounded-lg">Create</button>
                            <button onClick={handleCancelCreationAnnouncement} className="px-5 py-2.5 bg-red-500 text-white rounded-lg">Cancel</button>
                            </div>
                    </div>
                </Modal>
            </div>
            <div className="nav flex justify-between items-center mt-3">
                <button 
                    onClick={showPrevAnnouncement} 
                    className={`cursor-pointer flex items-center bg-[#1a1a1a] text-white p-2 px-4 rounded-full text-sm ${announcementsIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={announcementsIndex === 0}>
                    <MdArrowBackIos />Prev
                </button>
                <div className="bg-gray-300 flex gap-3 p-3 rounded-lg">
                    <span className="flex items-center gap-2 text-sm font-[500]">
                        <LuCalendarDays className="text-lg" />{announcements[announcementsIndex].date}
                    </span> 
                    <span className="flex items-center gap-2 text-sm font-[500]">
                        <IoMdTime className="text-lg" />{announcements[announcementsIndex].time}
                    </span> 
                </div>
                <button 
                    onClick={showNextAnnouncement}
                    className={`cursor-pointer flex items-center gap-1 bg-[#1a1a1a] text-white p-2 px-4 rounded-full text-sm ${announcementsIndex === announcements.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={announcementsIndex === announcements.length - 1}>
                    Next<MdArrowForwardIos />
                </button>
            </div>
            <div className="relative mt-4">
                <div className="bg-white h-[205px] p-3 rounded-lg relative">
                    <span className="absolute top-2 right-2 text-sm text-gray-500">
                        {announcementsIndex + 1}/{announcements.length}
                    </span>
                    <h2 className="text-xl font-[500] -mb-1">{announcements[announcementsIndex].title.length > 35 ? announcements[announcementsIndex].title.slice(0, 35) + '...' : announcements[announcementsIndex].title}</h2>
                    <span className="text-sm text-gray-500">By {announcements[announcementsIndex].author}</span>
                    <p className="text-black">{announcements[announcementsIndex].content.length > 250 ? announcements[announcementsIndex].content.slice(0, 220) + '...' : announcements[announcementsIndex].content}</p>
                    <button 
                        title="Expand"
                        className="absolute bottom-4 right-4 text-gray-500 hover:text-gray-800" 
                        onClick={() => setIsModalOpen(true)}>
                        <FaExpand size={20} />
                    </button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <div className="bg-gray-300 p-4">
                <h2 className="text-xl font-[500] ">{announcements[announcementsIndex].title}</h2>
                <p className="text-sm text-gray-500">By {announcements[announcementsIndex].author} | {announcements[announcementsIndex].date} at {announcements[announcementsIndex].time}</p>
                <div className={announcements[announcementsIndex].content.length > 200 ? 'bg-white p-3 rounded-lg mt-3 h-[400px] overflow-y-auto' : 'bg-white p-3 rounded-lg mt-3'}>
                <p className="text-black">{announcements[announcementsIndex].content}</p>
                </div>

                </div>
            </Modal>
        </div>
    );
};

export default PDAnnouncement;
