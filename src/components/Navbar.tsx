"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Bell, Menu, X } from "react-feather";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/calendar", label: "Calendar" },
    { href: "/reports", label: "Reports" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Calendar className="text-primary-500 h-6 w-6" />
              <span className="ml-2 text-xl font-bold text-gray-900">EventSync Pro</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href
                    ? "text-primary-500 bg-primary-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <div className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotification}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <Bell className="h-6 w-6" />
              </button>
              {isNotificationOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 font-bold">Notifications</div>
                    <div className="border-t border-gray-100"></div>
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-600">You have no new notifications.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-3 relative">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <span>GM</span>
              </div>
            </div>
            <div className="sm:hidden flex items-center ml-3">
              <button onClick={toggleMobileMenu} className="p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "text-primary-500 bg-primary-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}