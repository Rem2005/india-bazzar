'use client';

import { useAuth } from '@/context/AuthContext';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default function Header() {
  const { user } = useAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="w-full flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-bold">India Bazzar</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <p>{user.displayName}</p>
          <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="px-3 py-1 bg-blue-500 text-white rounded">
          Login
        </button>
      )}
    </header>
  );
}
