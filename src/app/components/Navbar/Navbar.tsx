'use client';

import { useUser } from '@/app/context/UserContext';
import { signout } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signout();
      localStorage.removeItem('userProfile'); // optional
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleLogin = () => router.push('/auth/Login');
  const handleSignup = () => router.push('/auth/Signup');

  if (loading) return null;

  return (
    <div className="bg-[#27293d] flex items-center p-4 shadow-md text-white">
      <h1 className="font-bold text-xl text-[#00c6ff]">Blog AI</h1>
      <div className="flex-grow" />

      {user ? (
        <div className="flex items-center gap-6 px-4">
          <div className="text-sm text-right leading-tight">
            <p className="font-semibold">
              {user.name || user.displayName || 'User'}
            </p>
            <p className="text-gray-300 text-xs">
              {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-[#00c6ff] text-[#1e1e2f] hover:bg-[#00a5dd] font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4 px-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 rounded bg-[#00c6ff] text-[#1e1e2f] hover:bg-[#00a5dd] font-semibold"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="px-4 py-2 rounded border border-[#00c6ff] text-[#00c6ff] hover:bg-[#00a5dd] hover:text-white font-semibold"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
