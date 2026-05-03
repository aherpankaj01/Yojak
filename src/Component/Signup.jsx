import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const user = await authService.createAccount(data);

      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-3 sm:px-4 md:px-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg">
            <Logo width="50px" className="sm:w-[60px]" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-2">
          Create Account 🚀
        </h2>

        <p className="text-center text-sm sm:text-base text-gray-300 mb-5 sm:mb-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <p className="text-red-400 text-center text-sm sm:text-base mb-4 bg-red-500/10 py-2 rounded-lg">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit(create)}
          className="space-y-4 sm:space-y-5"
        >
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="bg-white/20 text-white border-none placeholder-gray-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            {...register("name", { required: true })}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="bg-white/20 text-white border-none placeholder-gray-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Invalid email address",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="bg-white/20 text-white border-none placeholder-gray-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            {...register("password", { required: true })}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              className="px-10 sm:px-14 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 sm:py-2.5 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
