'use client';

import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Sparkles, Brain, Menu as MenuIcon, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/chat", label: "Chat" },
  ];

  const Logo = () => (
    <motion.div
      className="flex items-center space-x-2 group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <Brain className="w-8 h-8 text-primary" />
        <Sparkles className="w-4 h-4 text-primary/80 absolute -top-1 -right-1" />
      </div>
      <div className="flex flex-col">
        <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent font-bold text-lg">
          WISDOMAI
        </span>
        <span className="text-[10px] text-muted-foreground font-medium">
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
          "fixed top-10 inset-x-0 max-w-[36rem] mx-auto z-50 hidden md:block",
          className
        )}
      >
        <NavigationMenu className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border rounded-full px-6 py-2">
          <NavigationMenuList className="flex items-center justify-between w-full gap-6">
            <NavigationMenuItem>
              <Link href="/">
                <Logo />
              </Link>
            </NavigationMenuItem>

            <div className="flex items-center gap-6">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              
              <NavigationMenuItem>
                <Link href="/login">
                  <Button variant="default" size="sm" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/">
              <Logo />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <MenuIcon className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
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
                        className="text-muted-foreground hover:text-primary transition-colors py-2 block"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full gap-2">
                        <LogIn className="w-4 h-4" />
                        Login
                      </Button>
                    </Link>
                  </motion.div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;