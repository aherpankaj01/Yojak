import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Logo width="70px" />
              <span className="text-lg sm:text-xl font-bold text-white">
                YOJAK
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              A modern blogging platform where you can share ideas, explore
              content, and connect with the world.
            </p>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase text-gray-400 mb-4 tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate", "Press Kit"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-sm hover:text-white transition inline-block hover:translate-x-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase text-gray-400 mb-4 tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact", "Support"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-sm hover:text-white transition inline-block hover:translate-x-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase text-gray-400 mb-4 tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Terms", "Privacy", "Licensing"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-sm hover:text-white transition inline-block hover:translate-x-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} YOJAK. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {["Twitter", "GitHub", "LinkedIn"].map((social) => (
              <span
                key={social}
                className="text-xs sm:text-sm px-3 py-1 border border-white/10 rounded-full cursor-pointer hover:text-white hover:border-white/30 transition"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
