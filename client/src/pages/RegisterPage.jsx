import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { PiSealCheckLight } from "react-icons/pi";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [classWhenEyeClick, setClassWhenClick] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const watchPassword = watch("password") || "";

  const [lowerCaseIsValid, setLowerCaseIsValid] = useState(false);
  const [upperCaseIsValid, setUpperCaseIsValid] = useState(false);
  const [numAndSymbolIsValid, setNumAndSymbolIsValid] = useState(false);
  const [validLength, setValidLength] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const mustLowerCase = /[a-z]/;
    const mustUpperCase = /[A-Z]/;
    const mustNumAndSymbol = /[\d!@#$%^&*(),.?":{}|<>]/;
    setLowerCaseIsValid(mustLowerCase.test(watchPassword));
    setUpperCaseIsValid(mustUpperCase.test(watchPassword));
    setNumAndSymbolIsValid(mustNumAndSymbol.test(watchPassword));
    setValidLength(watchPassword.length >= 6);
  }, [watchPassword]);

  const handleWhenEyeClick = () => {
    setShowPassword(!showPassword);
    setClassWhenClick("translate-y-1");
    setTimeout(() => {
      const timer = setClassWhenClick("");
      return () => clearTimeout(timer);
    }, 300);
  };

  const { mutate: registerUser } = useMutation({
    mutationFn: apiClient.register,
    onSuccess: () => {
      toast.success("Berhasil membuat akunmu");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    },
    onError: () => {
      toast.error("Terjadi kesalahan");
    },
  });

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <form
      className="container mx-auto flex items-center justify-center p-5 md:p-0 pt-20 pb-12 h-[90vh]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-7">
        <div className="space-y-5">
          <h4 className="font-semibold text-center text-3xl">Adios</h4>
          <h1 className="font-bold text-5xl text-center">Buat Akun</h1>
        </div>

        <div className="flex flex-col gap-5 w-screen p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label>
              <span className="font-bold text-xl">Nama Depan</span>
              <input
                type="text"
                className="w-full border-2 border-black focus:outline-none font-bold text-xl py-3 px-2 rounded"
                {...register("firstName", {
                  required: "First Name harus diisi",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </label>
            <label>
              <span className="font-bold text-xl">Nama Belakang</span>
              <input
                type="text"
                className="w-full border-2 border-black focus:outline-none font-bold text-xl py-3 px-2 rounded"
                {...register("lastName", {
                  required: "Last Name harus diisi",
                })}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </label>
          </div>
          <label>
            <span className="font-bold text-xl">Email</span>
            <input
              type="email"
              className="w-full border-2 border-black focus:outline-none font-bold text-xl py-3 px-2 rounded"
              {...register("email", {
                required: "Email harus diisi",
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </label>
          <label className="relative">
            <span className="font-bold text-xl">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border-2 border-black focus:outline-none font-bold text-xl py-3 px-2 rounded"
              autoComplete="off"
              {...register("password", {
                required: "Password harus diisi",
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
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
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                {!lowerCaseIsValid ? (
                  <PiSealCheckLight size={30} className="text-slate-900" />
                ) : (
                  <PiSealCheckLight size={30} className="text-green-500" />
                )}
                <h4 className="font-medium text-slate-500 text-xl">
                  Huruf kecil
                </h4>
              </div>
              <div className="flex gap-2">
                {!upperCaseIsValid ? (
                  <PiSealCheckLight size={30} className="text-slate-900" />
                ) : (
                  <PiSealCheckLight size={30} className="text-green-500" />
                )}
                <h4 className="font-medium text-slate-500 text-xl">
                  Huruf besar
                </h4>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                {!numAndSymbolIsValid ? (
                  <PiSealCheckLight size={30} className="text-slate-900" />
                ) : (
                  <PiSealCheckLight size={30} className="text-green-500" />
                )}
                <h4 className="font-medium text-slate-500 text-xl">Angka</h4>
              </div>
              <div className="flex gap-2">
                {!validLength ? (
                  <PiSealCheckLight size={30} className="text-slate-900" />
                ) : (
                  <PiSealCheckLight size={30} className="text-green-500" />
                )}
                <h4 className="font-medium text-slate-500 text-xl">
                  Minimal 6 karakter
                </h4>
              </div>
            </div>
          </div>
          <label className="relative">
            <span className="font-bold text-xl">Ulangi Password</span>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border-2 border-black focus:outline-none font-bold text-xl py-3 px-2 rounded"
              autoComplete="off"
              {...register("confirmPassword", {
                validate: (value) => {
                  if (value !== watchPassword) return "Password tidak cocok";
                  if (value.length === 0) return "Password harus diisi";
                  return true;
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
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
          <div>
            <div className="font-bold text-xl">Gender</div>
            <div className="flex gap-4">
              {["Laki-laki", "Perempuan"].map((gender) => (
                <label key={gender} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    value={gender}
                    {...register("gender", {
                      required: "Gender harus diisi",
                    })}
                  />
                  <span className="font-semibold text-lg">{gender}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 text-center bg-green-600 rounded text-white font-bold text-xl hover:bg-green-500 transition ease-in-out duration-200"
        >
          Buat Akun
        </button>
        <div className="font-normal text-xl text-slate-500 flex gap-1">
          <h2>Udah punya akun?</h2>
          <Link to="/login" className="text-green-600">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
export default RegisterPage;
