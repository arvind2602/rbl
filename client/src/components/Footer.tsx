import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Us
            </h2>
            <p className="text-gray-400 leading-relaxed">
            WISDOM AI is an innovative, AI-powered counseling platform that leverages student data from ERP systems to provide personalized guidance and answers.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="inline-block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Follow Us
            </h2>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <FaFacebook className="group-hover:scale-110 transition-transform duration-300" />
                <span>Facebook</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <FaTwitter className="group-hover:scale-110 transition-transform duration-300" />
                <span>Twitter</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <FaInstagram className="group-hover:scale-110 transition-transform duration-300" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-purple-400" />
                <span>Maharashtra, India</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-purple-400" />
                <span>Mumbai 400101</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-purple-400" />
                <span>info@ai.com</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-purple-400" />
                <span>(123) 456-7890</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 IT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;