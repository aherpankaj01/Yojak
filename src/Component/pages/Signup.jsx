import React from "react";
import { Signup as SignupComponent } from "../../Component";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10">
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
