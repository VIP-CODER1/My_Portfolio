import React, { useState } from "react";

const Navbar = () => {
  // State to manage the hamburger menu toggle
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <a href="#hero" className="hover:text-gray-300">
            My Portfolio
          </a>
        </h1>

        {/* Hamburger icon for small screens */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? (
              // Cross (X) icon when menu is open
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation links (visible on large screens and when menu is open) */}
        <ul
          className={`lg:flex space-x-6 ${isOpen ? "block" : "hidden"} lg:block`}
        >
          <li>
            <a href="#hero" className="hover:text-green-300">
              Home
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-green-300">
              Projects
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-green-300">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-green-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
