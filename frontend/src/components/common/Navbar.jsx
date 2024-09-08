import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext"; // Import the Cart Context

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const isAdmin = ApiService.isAdmin();
  const isAuthenticated = ApiService.isAuthenticated();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart(); // Access cart state from the Cart Context

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    navigate(`/?search=${searchValue}`);
  };

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      ApiService.logout();
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  return (
    <nav className="bg-blue-600 shadow-lg p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center text-white text-xl font-bold"
        >
          <img
            src="./SharinganAvatar.png"
            alt="Xpert Ecommerce"
            className="h-10 w-10 mr-2"
          />
          <span className="hidden sm:inline">Xpert Ecommerce</span>
        </NavLink>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`md:flex md:items-center md:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <NavLink to="/" className="text-white hover:text-gray-300 py-2 block">
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className="text-white hover:text-gray-300 py-2 block"
          >
            Categories
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/profile"
              className="text-white hover:text-gray-300 py-2 block"
            >
              My Account
            </NavLink>
          )}
          {isAdmin && (
            <NavLink
              to="/admin"
              className="text-white hover:text-gray-300 py-2 block"
            >
              Admin
            </NavLink>
          )}
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="text-white hover:text-gray-300 py-2 block"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300 py-2 block"
            >
              Logout
            </button>
          )}
          <div className="relative">
            <NavLink
              to="/cart"
              className="text-white hover:text-gray-300 py-2 px-2 block"
            >
              Cart
            </NavLink>
            {/* Red dot indicator */}
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 ring-1 ring-white"></span>
              </span>
            )}
          </div>
        </div>

        {/* Search Form */}
        <form
          className="hidden md:flex items-center bg-white rounded-full overflow-hidden w-64 ml-4"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="Search products"
            value={searchValue}
            onChange={handleSearchChange}
            className="flex-1 px-4 py-2 text-sm text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 flex items-center justify-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
