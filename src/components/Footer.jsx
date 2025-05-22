import React from "react";
import RSS from "../assets/icons/rss.svg";
import facebook from "../assets/icons/facebook.png";
import googlePlus from "../assets/icons/google-plus.svg";
import instagram from "../assets/icons/instagram.svg";
import linkedIn from "../assets/icons/linkedin.svg";
import logoLift from "../assets/icons/logoLIFT.svg";
import pinterest from "../assets/icons/pinterest.svg";
import rounded1 from "../assets/icons/phone.svg";
import shape from "../assets/icons/shape.svg";
import twitter from "../assets/icons/twitter.svg";
import youtube from "../assets/icons/youtube.svg";

export const Footer = () => {
  return (
    <footer className="bg-[#000235] text-white px-6 md:px-12 py-12">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo */}
          <img
            className="w-32 md:w-40 mb-6 md:mb-0"
            alt="Logo LIFT"
            src={logoLift}
          />

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-sm">
            <div className="flex items-center gap-2">
              <img src={rounded1} alt="Phone icon" className="w-4 h-4" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={shape} alt="Shape icon" className="w-4 h-4" />
              <span>(123) 456-7890</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <p className="opacity-70 text-sm mb-2">Social Media</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
              <img src={twitter} alt="Twitter" className="w-5 h-5" />
              <img src={linkedIn} alt="LinkedIn" className="w-5 h-5" />
              <img src={youtube} alt="YouTube" className="w-5 h-5" />
              <img src={instagram} alt="Instagram" className="w-5 h-5" />
              <img src={googlePlus} alt="Google Plus" className="w-5 h-5" />
              <img src={pinterest} alt="Pinterest" className="w-5 h-5" />
              <img src={RSS} alt="RSS" className="w-5 h-5" />
            </div>
          </div>
        </div>

        <hr className="opacity-20 border-white" />

        {/* Bottom Links and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a href="/about" className="hover:underline">ABOUT US</a>
            <a href="/contact" className="hover:underline">CONTACT US</a>
            <a href="/help" className="hover:underline">HELP</a>
            <a href="/privacy_policy" className="hover:underline">PRIVACY POLICY</a>
            <a href="#" className="hover:underline">DISCLAIMER</a>
          </div>
         
          <p className="opacity-70 cursor-pointer
          "> <a href="/" className="hover:underline" >&copy; 2024 • FileFolio.</a></p>         
        </div>
      </div>
    </footer>
  );
};
