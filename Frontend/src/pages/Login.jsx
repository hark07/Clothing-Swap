import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", formData);

      // Store using Auth Context
      login(data.token, data.user);

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
      <div
        className="
        w-full max-w-md
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        border border-gray-100
      "
      >
        {/* Header */}

        <div className="text-center mb-8">
          <div
            className="
            mx-auto
            w-16 h-16
            rounded-full
            bg-emerald-100
            flex items-center justify-center
            text-emerald-600
            text-3xl
            font-bold
            mb-4
          "
          >
            S
          </div>

          <h2
            className="
            text-3xl
            font-bold
            text-gray-800
          "
          >
            Welcome Back
          </h2>

          <p
            className="
            text-gray-500
            mt-2
          "
          >
            Login to continue swapping clothes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}

          <div>
            <label
              className="
              text-sm
              font-medium
              text-gray-700
            "
            >
              Email
            </label>

            <div className="relative mt-2">
              <Mail
                size={20}
                className="
                  absolute
                  left-3
                  top-3.5
                  text-gray-400
                "
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  border
                  border-gray-300
                  focus:border-emerald-500
                  focus:ring-2
                  focus:ring-emerald-200
                  outline-none
                  transition
                "
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label
              className="
              text-sm
              font-medium
              text-gray-700
            "
            >
              Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={20}
                className="
                  absolute
                  left-3
                  top-3.5
                  text-gray-400
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="
                  w-full
                  pl-11
                  pr-12
                  py-3
                  rounded-xl
                  border
                  border-gray-300
                  focus:border-emerald-500
                  focus:ring-2
                  focus:ring-emerald-200
                  outline-none
                  transition
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-3
                  text-gray-500
                  hover:text-emerald-600
                "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}

          <button
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              bg-emerald-600
              hover:bg-emerald-700
              text-white
              font-semibold
              transition
              shadow-md
              disabled:opacity-50
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          className="
          text-center
          mt-7
          text-gray-600
        "
        >
          Don't have an account?
          <Link
            to="/register"
            className="
              ml-1
              text-emerald-600
              font-semibold
              hover:underline
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
