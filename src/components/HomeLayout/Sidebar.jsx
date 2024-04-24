import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="bg-blue-300 flex justify-between px-20 py-6">
      <h2>logo</h2>
      <ul className="flex gap-10">
        <li>
          <Link to={"/tasks"}>Tasks</Link>
        </li>
        <li>
          <Link to={"/meeting"}>Meeting</Link>
        </li>
        <li>
          <Link to={"/chats"}>Chats</Link>
        </li>
        <li>
          <Link to={""}>Notification</Link>
        </li>
        <li>
          <Link to={""}>USER</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
