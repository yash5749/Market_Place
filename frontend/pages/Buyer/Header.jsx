import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-base-100/80 border-b border-base-300 shadow-md">
      <nav className="navbar max-w-7xl mx-auto px-4 sm:px-6">
        {/* Left - Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-10 p-3 shadow-lg bg-base-200 rounded-box w-52 border border-base-300"
            >
              <li>
                <a className="flex items-center gap-2">🏍️ Explore</a>
              </li>
              <li>
                <a className="flex items-center gap-2">ℹ️ About</a>
              </li>
              <li>
                <a className="flex items-center gap-2">📞 Contact</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Center - Brand */}
        <div className="navbar-center">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent select-none tracking-tight"
          >
            MarketPlace
          </Link>
        </div>

        {/* Right - CTA */}
        <div className="navbar-end flex items-center gap-3">
          <span className="hidden sm:inline text-sm opacity-70">
            Want to Upload a Bike?
          </span>

          <Link
            to="/login"
            className="btn btn-primary btn-sm shadow-md hover:scale-105 transition-transform"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
