import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start mb-6">
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <NavLink to="/" className="hover:text-gray-400">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:text-gray-400">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:text-gray-400">
                Terms & Conditions
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:text-gray-400">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:text-gray-400">
                FAQs
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Footer Info */}
        <div className="text-center border-t border-gray-700 pt-4">
          <p className="text-sm">
            &copy; 2024 Xpert Ecommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
