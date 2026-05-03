import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        relative overflow-hidden
        px-4 sm:px-5 py-2 sm:py-2.5
        rounded-full
        bg-gradient-to-r from-red-500 via-pink-500 to-red-600
        text-white font-semibold text-xs sm:text-sm
        shadow-lg shadow-red-500/30
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-red-500/50
        active:scale-95
        w-full sm:w-auto
      "
    >
      <span className="absolute inset-0 bg-white/10 blur-xl opacity-0 hover:opacity-100 transition duration-300"></span>

      <span className="relative z-10 flex items-center justify-center gap-2">
        🔓 Logout
      </span>
    </button>
  );
};

export default LogoutBtn;
