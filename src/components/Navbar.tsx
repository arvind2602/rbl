'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Sparkles, Brain, Menu as MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const Logo = () => (
    <motion.div
      className="flex items-center space-x-2 group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <Brain className="w-8 h-8 text-blue-400" />
        <Sparkles className="w-4 h-4 text-violet-400 absolute -top-1 -right-1" />
      </div>
      <div className="flex flex-col">
        <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent font-bold text-lg">
          WISDOMAI
        </span>
        <span className="text-[10px] text-zinc-400 font-medium">
          Your Digital Guide
        </span>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className={cn(
          "fixed top-10 inset-x-0 max-w-[30rem] mx-auto z-50 hidden md:block",
          className
        )}
      >
        <Menu setActive={setActive}>
          <Link href="/">
            <Logo />
          </Link>
          {menuItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <MenuItem
                setActive={setActive}
                active={active}
                item={item.label}
              />
            </Link>
          ))}
        </Menu>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/">
              <Logo />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 py-2 space-y-1">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Navbar;