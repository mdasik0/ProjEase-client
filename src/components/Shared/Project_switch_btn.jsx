import { useState } from 'react';
import { GoArrowSwitch } from 'react-icons/go';
import { IoIosArrowDown, IoMdCheckmark } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Project_switch_btn = () => {
    const [openProjectDropDown, setOpenProjectDropDown] = useState(false)
    const {userData} = useSelector(state => state.userSlice)
    const openDropDown = () => {
      setOpenProjectDropDown(!openProjectDropDown)
    }
    const selectProject = (projectId) => {
        console.log(projectId)
    }

    console.log(userData.joinedProjects)
    return (
        <div className="p-4 relative">

            
        <div className={`absolute duration-500 w-[250px] p-3 bg-gray-300 border border-gray-300 rounded-xl flex flex-col gap-3 ${openProjectDropDown ? '-right-[102%] bottom-3' : '-right-[70%] opacity-0 pointer-events-none'}`}>
        {
            userData.joinedProjects.map((project) => <div key={project.projectId} onClick={openDropDown} className="bg-gray-100 p-3 rounded-lg font-[500] border border-gray-300 hover:border-gray-500 flex items-center justify-between cursor-pointer duration-300">
            <h4>This is a applicant</h4>
            {project.status === "active" ? <IoMdCheckmark className='text-green-500' /> : <GoArrowSwitch />}
          </div>)
        }
        </div>


        <div className="flex items-center justify-between  mb-1 mx-2">
        <p className="text-xs">Switch project</p>
        <GoArrowSwitch className="text-sm" />
        </div>
        <div onClick={openDropDown} className="bg-gray-100 p-3 rounded-lg font-[500] border border-gray-300 hover:border-gray-400 flex items-center justify-between cursor-pointer duration-300">
          <h4>This is a applicant</h4>
          <IoIosArrowDown />
        </div>
      </div>
    );
};

export default Project_switch_btn;