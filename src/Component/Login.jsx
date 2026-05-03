import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-3 sm:px-4 md:px-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
        <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg backdrop-blur-lg bg-white/ border border-white/10 shadow-2xl rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col items-center justify-center mb-6 text-center">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center">
              <Logo width="55px" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-center text-gray-300 mb-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Sign Up
            </Link>
          </p>

          {error && (
            <p className="text-red-400 text-center mb-4 bg-red-500/10 py-2 rounded-lg">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit(login)} className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="px-10 sm:px-14"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
