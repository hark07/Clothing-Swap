import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaExchangeAlt,
  FaFlag,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ open }) => {
  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      name: "Items",
      path: "/items",
      icon: <FaBoxOpen />,
    },
    {
      name: "Swaps",
      path: "/swaps",
      icon: <FaExchangeAlt />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaFlag />,
    },
  ];

  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className={`
      bg-gray-900 text-white
      fixed md:static
      top-0 left-0
      h-screen
      w-64
      z-50
      transition-all duration-300
      ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
    >
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      <div className="mt-5 flex flex-col gap-2 px-3">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
            }
          >
            {menu.icon}
            {menu.name}
          </NavLink>
        ))}

        <button
          onClick={logoutHandler}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 mt-5"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
