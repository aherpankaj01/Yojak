import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogOutBtn";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg">
      <Container>
        <nav className="flex flex-col sm:flex-row items-center justify-between py-4 sm:py-5 gap-4 sm:gap-0">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <Logo width="70px" />
            <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Yojak
            </span>
          </Link>

          <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="
                        px-4 sm:px-5 md:px-6
                        py-2 sm:py-2.5
                        text-xs sm:text-sm md:text-base
                        font-semibold
                        text-white
                        rounded-full
                        transition-all duration-300
                        hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500
                        hover:shadow-lg hover:scale-105
                        whitespace-nowrap
                      "
                    >
                      {item.name}
                    </button>
                  </li>
                ),
            )}

            {authStatus && (
              <li className="ml-0 sm:ml-3 w-full sm:w-auto flex justify-center">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
