import {
  FaBars,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = ({ setOpen }) => {
  return (
    <div className="bg-white shadow-sm px-4 py-4 flex justify-between items-center">
      <button
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <FaBars size={22} />
      </button>

      <h1 className="font-bold text-xl">
        Clothing Exchange Admin
      </h1>

      <div className="flex items-center gap-4">
        <FaBell
          size={20}
          className="cursor-pointer"
        />

        <FaUserCircle
          size={30}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;