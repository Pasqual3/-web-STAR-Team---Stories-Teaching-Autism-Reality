import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { appContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, setIsLoggedin, getUserData } = useContext(appContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false); // For btn to be disabled after submitting

  const navigate = useNavigate();
  const location = useLocation();

  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault(); // It will stop from reloading the page after submit
      setIsSubmitting(true); // btn disabled

      axios.defaults.withCredentials = true; // It will send the cookie

      const targetPath = location.state?.from || "/";

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate(targetPath);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate(targetPath);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-gradient-to-br from-blue-200 to-pink-400 min-w-screen min-h-screen flex flex-col justify-center items-center">
      <img
        onClick={() => navigate("/")}
        src={assets.myLogo}
        alt=""
        className="absolute left-5 sm:left-20 top-0 w-28 sm:w-32 cursor-pointer"
      />
      <div
        className=" bg-gradient-to-br from-pink-200  to-purple-400 border 
      p-10 rounded-xl shadow-xl w-full sm:w-96 border-slate-500 text-slate-200 text-sm"
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="text-center text-sm mb-6 text-indigo-800">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onsubmitHandler}>
          {state === "Sign Up" && (
            <div className="w-full mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#3a4a53]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none "
                type="text"
                placeholder="Enter Full Name"
                required
              />
            </div>
          )}

          <div className="w-full mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#3a4a53]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none "
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="w-full mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#3a4a53]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none flex-1"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 focus:outline-none"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          {state === 'Login' && (

            <p
              onClick={() => navigate("/reset-password")}
              className="mb-4 cursor-pointer text-indigo-500"
            >
              Forgot password?
            </p>
          )}

          <button
            // className="w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-800 text-white font-medium"
            className={`w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-800 text-white font-medium ${isSubmitting
              ? "bg-gray-400 cursor-not-allowed border-2 border-blue-500 outline outline-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="mt-4 text-xs text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="cursor-pointer underline text-indigo-600"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-xs text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="cursor-pointer underline text-indigo-600"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
