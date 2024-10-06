import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdDoNotDisturbOn } from "react-icons/md";

const MobileNavUser = () => {
  const [statusOn, setStatusOn] = useState(false);
  return (
    <>
      <div className="bg-[#2a2a2a] p-4 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f]  flex gap-4 items-center">
        <div className="avatar online">
          <div className="w-14 h-14 object-cover rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-0">
          <span>Md Asik</span>
          <div className="-mt-1">
            <span className="text-[12px] text-gray-400 ">Online</span>
          </div>
        </div>
      </div>
      <div
  onClick={() => setStatusOn(!statusOn)}
  className={`bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300 border-[#3f3f3f] hover:bg-[#2f2f2f] flex flex-col  cursor-pointer `}
>
  <div className="container flex gap-2 items-center">
    <p className="w-3 h-3 bg-green-500 border-2 border-white rounded-full"></p>
    Change Status
  </div>
  <div
    className={`overflow-hidden transition-[max-height] duration-700 ${
      statusOn ? "expanded-max-height" : "max-h-0"
    }`}
  >
    <ul className="border-t border-[#3f3f3f] mt-2 text-sm">
      <li className="hover:bg-[#3f3f3f] px-2 py-1.5 rounded-md cursor-pointer flex items-center gap-2">
        <p className="w-3 h-3 bg-green-500 border-2 border-white rounded-full"></p>
        Online
      </li>
      <li className="hover:bg-[#3f3f3f] px-2 py-1.5 rounded-md cursor-pointer flex items-center gap-2">
        <FaMoon className="text-yellow-500 text-xs" /> Idle
      </li>
      <li className="hover:bg-[#3f3f3f] px-2 py-1.5 rounded-md cursor-pointer flex items-center gap-2">
        <MdDoNotDisturbOn className="text-red-500 text-sm" /> Do not disturb
      </li>
      <li className="hover:bg-[#3f3f3f] px-2 py-1.5 rounded-md cursor-pointer flex items-center gap-2">
        <p className="w-3 h-3 border-[3px] border-gray-400 rounded-full"></p>
        Invisible
      </li>
    </ul>
  </div>
</div>

    </>
  );
};

export default MobileNavUser;
