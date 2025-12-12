import { Link } from "react-router-dom";
import { BookOpen, Send, Facebook, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <BookOpen className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">
                LightHouse
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Connecting libraries to readers. Borrow and return books from the
              comfort of your home.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:-translate-y-1 cursor-pointer transition-all duration-300 border border-slate-100 dark:border-slate-800">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:-translate-y-1 cursor-pointer transition-all duration-300 border border-slate-100 dark:border-slate-800">
                <Facebook size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:-translate-y-1 cursor-pointer transition-all duration-300 border border-slate-100 dark:border-slate-800">
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:-translate-y-1 cursor-pointer transition-all duration-300 border border-slate-100 dark:border-slate-800">
                <Github size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <Link to="/" className="hover:text-emerald-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-emerald-600 transition">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-600 transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>123 Library Street</li>
              <li>Dhaka, Bangladesh</li>
              <li>support@LightHouse.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-slate-500 mb-4">
              Subscribe for latest updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm">
          &copy; 2025 LightHouse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
