import React from "react";
import { Login as LoginComponent } from "../../Component";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-indigo-500/20">
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
