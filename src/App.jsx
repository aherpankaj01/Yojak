import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(
            login({
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
            }),
          );
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white px-4">
        <p className="text-base sm:text-lg md:text-xl animate-pulse text-center">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-3 sm:px-5 md:px-8 lg:px-12 py-4 sm:py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
