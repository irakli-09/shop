import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: '/', label: 'Models' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter uppercase">
            3D<span className="font-light">Project</span>
          </Link>

          <nav className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={clsx(
                    "text-sm font-medium uppercase tracking-wide transition-colors hover:text-gray-500",
                    location.pathname === link.href ? "text-black" : "text-gray-400"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link to="/basket" className="relative group">
              <ShoppingBag className="w-6 h-6 text-black group-hover:text-gray-600 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link 
              to="/submit" 
              className="hidden md:block text-sm font-medium uppercase tracking-wide border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
            >
              Submit Model
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} 3D Project. All rights reserved.
          </div>

          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
