import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaTshirt, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { token, user, logout } = useAuth();

  const navLinkStyle = ({ isActive }) =>
    `relative text-[15px] font-medium transition duration-300 ${
      isActive ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
    }`;

  const logoutHandler = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition duration-300">
              <FaTshirt className="text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-wide">
                <span className="text-emerald-600">Clothing</span>

                <span className="text-gray-900">Swap</span>
              </h1>

              <p className="text-xs text-gray-500 -mt-1">Sustainable Fashion</p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>

            {token && (
              <>
                <NavLink to="/products" className={navLinkStyle}>
                  Browse
                </NavLink>
                <NavLink to="/dashboard" className={navLinkStyle}>
                  Dashboard
                </NavLink>

                <NavLink to="/add-item" className={navLinkStyle}>
                  Add Item
                </NavLink>

                <NavLink to="/swaps" className={navLinkStyle}>
                  Swaps
                </NavLink>
              </>
            )}

            {!token ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium transition duration-300"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transition duration-300"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                {/* Profile */}

                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 rounded-full pl-2 pr-4 py-2 transition duration-300"
                >
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                    />
                  ) : (
                    <FaUserCircle className="text-4xl text-gray-500" />
                  )}

                  <div className="hidden xl:block">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-gray-500">My Account</p>
                  </div>
                </Link>

                <button
                  onClick={logoutHandler}
                  className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium shadow-lg transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition duration-300"
          >
            {isOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-6 py-6 flex flex-col gap-5">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              Home
            </NavLink>

            {token && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={navLinkStyle}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/add-item"
                  onClick={() => setIsOpen(false)}
                  className={navLinkStyle}
                >
                  Add Item
                </NavLink>

                <NavLink
                  to="/swaps"
                  onClick={() => setIsOpen(false)}
                  className={navLinkStyle}
                >
                  Swaps
                </NavLink>
              </>
            )}

            <div className="border-t pt-5">
              {!token ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center border border-emerald-600 text-emerald-600 py-3 rounded-xl font-medium hover:bg-emerald-50 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-3">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                      />
                    ) : (
                      <FaUserCircle className="text-5xl text-gray-500" />
                    )}

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user?.name || "User"}
                      </h3>

                      <p className="text-sm text-gray-500">Welcome Back 👋</p>
                    </div>
                  </div>

                  <button
                    onClick={logoutHandler}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
