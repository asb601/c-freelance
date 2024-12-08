'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // React Router's `useNavigate` for navigation

  const handleNavigateToAllProducts = () => {
    navigate('/AllProducts'); // Navigate to All Products
  };

  const handleNavigateToContact = () => {
    navigate('/contact'); // Navigate to Contact page
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to Login page
  };

  return (
    <header className="bg-white shadow">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Left: Sidebar Button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Cricket Store</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Cricket Store"
            />
          </a>
        </div>

        {/* Center: Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          <button
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleNavigateToAllProducts}
          >
            Products
          </button>
          <button
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleNavigateToContact}
          >
            Contact
          </button>
        </div>

        {/* Right: Login and User Icon */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          <UserIcon className="h-6 w-6 text-gray-900" aria-hidden="true" />
          <button
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            {/* Logo in Sidebar */}
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Cricket Store</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                alt="Cricket Store"
              />
            </a>
            {/* Close Sidebar */}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* Sidebar Navigation */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <button
                  className="-mx-3 block w-full rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 text-left"
                  onClick={handleNavigateToAllProducts}
                >
                  Products
                </button>
                <button
                  className="-mx-3 block w-full rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 text-left"
                  onClick={handleNavigateToContact}
                >
                  Contact
                </button>
              </div>
              <div className="py-6">
                <button
                  className="-mx-3 block w-full rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 text-left"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
