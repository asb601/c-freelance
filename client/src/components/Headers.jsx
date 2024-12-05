'use client';

import { useState } from 'react';
import {
  Dialog,
  Disclosure,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const products = [
  { name: 'All Products', route: '/AllProducts' }, // Add All Products link
  { name: 'Cricket Bats', route: '/cricket-bats' },
  { name: 'Kits', route: '/kits' },
  { name: 'Jerseys', route: '/jerseys' },
];

export default function Headers() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Use React Router's `useNavigate` to handle navigation

  const handleNavigateToContact = () => {
    navigate('/contact'); // Navigate to the Contact page
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <header className="bg-white shadow">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
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
        {/* Centered Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Products
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </PopoverButton>
            <PopoverPanel className="absolute z-10 mt-3 w-screen max-w-md -translate-x-1/2 left-1/2 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {products.map((product) => (
                  <a
                    key={product.name}
                    href={product.route} // Use route for navigation
                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <p className="block font-semibold text-gray-900">{product.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <button
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleNavigateToContact}
          >
            Contact
          </button>
        </div>
        {/* Login Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
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
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Cricket Store</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                alt="Cricket Store"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {products.map((product) => (
                  <a
                    key={product.name}
                    href={product.route} // Use route for navigation
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {product.name}
                  </a>
                ))}
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
