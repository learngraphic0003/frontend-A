import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import axios from "axios";
import { Server } from "../constant/constant";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedUsername = localStorage.getItem("username");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (authStatus === "true") {
      setIsAuthenticated(true);
      setUsername(storedUsername || "Guest");
      setProfileImage(storedProfileImage || "defaultProfileImage.jpg");
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(`${Server}/api/auth/profileAvatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const newAvatar = res.data.avatar;
      setProfileImage(newAvatar);
      localStorage.setItem("profileImage", newAvatar);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Explore", path: "/explore" },
    { name: "Contact", path: "/contact" },
  ];

  const ProfileImage = () => (
    <div
      className="relative group cursor-pointer"
      onClick={handleImageClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={profileImage || "defaultProfileImage.jpg"}
        alt="Profile"
        className="w-8 h-8 rounded-full border-2 border-white object-cover"
      />
      {hover && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
          <Upload className="text-white opacity-80" size={18} />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );

  return (
    <nav className="bg-darkblue text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto rounded-md" />
          <span className="text-xl font-semibold">FileFolio</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          <ul className="flex space-x-8 text-base font-medium">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link to={path} className="hover:text-blue-400 transition">
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2">
                  <ProfileImage />
                  <div className="flex flex-col items-start">
                    <span className="text-white">{username}</span>
                  </div>
                </div>
                <Link to="/profile">
                  <button className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-sm font-medium">
                    Visit Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-sm font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md text-sm font-medium">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-darkblue mt-4 rounded-md px-6 py-4 space-y-4 shadow-lg">
          <ul className="space-y-3 text-center text-lg">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-blue-400 transition"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 mt-4 items-center">
            {isAuthenticated ? (
              <>
                <ProfileImage />
                <div className="flex flex-col items-center gap-1">
                  <span>{username}</span>
                </div>
                <Link to="/ourProjects" onClick={() => setMenuOpen(false)}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                    Visit Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
