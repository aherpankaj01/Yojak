import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <h1 className="text-sm sm:text-base md:text-lg text-gray-300 animate-pulse text-center">
        Loading...
      </h1>
    </div>
  ) : (
    <>{children}</>
  );
}
