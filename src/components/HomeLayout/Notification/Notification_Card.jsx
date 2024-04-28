import { MdNotificationsActive } from 'react-icons/md';
import Notification_CardMenu from './Notification_CardMenu';

const Notification_Card = () => {
    return (
        <div
        className={`relative bg-zinc-800
             w-full rounded-xl cursor-pointer p-3`}
      >
        <div>
          <div className="flex gap-4 ">
            <div className=" ">
              <MdNotificationsActive className="w-7 h-7 " />
            </div>
            <div className="xl:w-44 flex-1">
              <h2 className="font-semibold  pr-10 pb-1 ">
                asik@gmali.com
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs">
                this is the description of the message
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <p className="text-gray-600 dark:text-darkGray text-[10px] flex items-center justify-end gap-3">
              {/* Date */}
              <span>24 - 04 - 2024</span>
              {/* Time */}
              <span>09: 03 pm</span>
            </p>
          </div>
        </div>

        {/* Actions menu for each notification */}
        <Notification_CardMenu />
      </div>
    );
};

export default Notification_Card;