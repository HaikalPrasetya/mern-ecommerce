import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

function LoginPage() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [classWhenEyeClick, setClassWhenClick] = useState("");
  const navigate = useNavigate();
  const { changeStateLogin } = useAppContext();

  const handleWhenEyeClick = () => {
    setShowPassword(!showPassword);
    setClassWhenClick("translate-y-1");
    setTimeout(() => {
      const timer = setClassWhenClick("");
      return () => clearTimeout(timer);
    }, 300);
  };

  const { mutate: login } = useMutation({
    mutationFn: apiClient.login,
    onSuccess: () => {
      toast.success("Login Success");
      changeStateLogin(true);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs);
  };

  return (
    <form
      className="container h-screen mx-auto flex items-center justify-center p-5 md:p-0"
      onSubmit={handleSubmit}
    >
      <div className="space-y-20">
        <div className="space-y-5">
          <h4 className="font-semibold text-center text-3xl">Admin Panel</h4>
          <h1 className="font-bold text-5xl text-center">
            Selamat datang di panel admin
          </h1>
        </div>

        <div className="flex flex-col gap-5">
          <label>
            <span className="font-bold text-xl">Username</span>
            <input
              type="text"
              className="w-full border-2 border-black focus:outline-none font-bold text-xl py-3 px-2 rounded"
              value={inputs.username}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </label>
          <label className="relative">
            <span className="font-bold text-xl">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border-2 border-black focus:outline-none font-bold text-xl py-3 px-2 rounded"
              autoComplete="off"
              value={inputs.password}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {showPassword ? (
              <FaRegEyeSlash
                size={40}
                className={`absolute right-5 top-9 cursor-pointer hover:bg-slate-200 p-1 rounded transition ease-in-out duration-150 ${classWhenEyeClick}`}
                onClick={handleWhenEyeClick}
              />
            ) : (
              <FaRegEye
                size={40}
                className={`absolute right-5 top-9 cursor-pointer hover:bg-slate-200 p-1 rounded transition ease-in-out duration-150 ${classWhenEyeClick}`}
                onClick={handleWhenEyeClick}
              />
            )}
          </label>
        </div>

        <button className="w-full py-3 text-center bg-green-600 rounded text-white font-bold text-xl hover:bg-green-500 transition ease-in-out duration-200">
          Login
        </button>
      </div>
    </form>
  );
}
export default LoginPage;
