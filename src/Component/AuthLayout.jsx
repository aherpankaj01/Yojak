import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
  }, [authStatus, navigate, authentication]);

  // Optional loading state while auth is being checked
  if (authStatus === undefined || authStatus === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <h1 className="text-sm sm:text-base md:text-lg text-gray-300 animate-pulse text-center">
          Loading...
        </h1>
      </div>
    );
  }

  return <>{children}</>;
}
