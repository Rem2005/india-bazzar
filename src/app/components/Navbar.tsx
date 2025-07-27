'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout, userRole } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-primary">India Bazzar</Link>

      <div className="space-x-4">
        {user ? (
          <>
            <Link href={userRole === 'vendor' ? '/vendor' : '/supplier'}>
              <span className="text-gray-700 hover:underline">Dashboard</span>
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 hover:underline">Login</Link>
            
          </>
        )}
      </div>
    </nav>
  );
}
