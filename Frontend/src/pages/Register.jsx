import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, MapPin, Lock, Eye, EyeOff } from "lucide-react";

import toast from "react-hot-toast";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
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

      const { data } = await API.post("/auth/register", formData);

      login(data.token, data.user);

      toast.success("Account created successfully");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-emerald-50
      via-white
      to-emerald-100
      px-4
      py-10
    "
    >
      <div
        className="
        w-full
        max-w-lg
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        border
        border-gray-100
      "
      >
        {/* Header */}

        <div className="text-center mb-8">
          <div
            className="
            w-16
            h-16
            mx-auto
            rounded-full
            bg-emerald-100
            flex
            items-center
            justify-center
            text-emerald-600
            mb-4
          "
          >
            <User size={32} />
          </div>

          <h1
            className="
            text-3xl
            font-bold
            text-gray-800
          "
          >
            Create Account
          </h1>

          <p
            className="
            text-gray-500
            mt-2
          "
          >
            Join the sustainable fashion community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            icon={<User size={20} />}
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />

          <InputField
            icon={<Mail size={20} />}
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@gmail.com"
          />

          <InputField
            icon={<MapPin size={20} />}
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Kathmandu"
          />

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

            <div
              className="
              relative
              mt-2
            "
            >
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
                minLength={6}
                required
                placeholder="******"
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

          <button
            type="submit"
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
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p
          className="
          text-center
          mt-7
          text-gray-600
        "
        >
          Already have an account?
          <Link
            to="/login"
            className="
              ml-1
              text-emerald-600
              font-semibold
              hover:underline
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

// Reusable Input Component

const InputField = ({
  icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label
        className="
 text-sm
 font-medium
 text-gray-700
"
      >
        {label}
      </label>

      <div
        className="
 relative
 mt-2
"
      >
        <div
          className="
 absolute
 left-3
 top-3.5
 text-gray-400
"
        >
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className="
 w-full
 pl-11
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
  );
};

export default Register;
