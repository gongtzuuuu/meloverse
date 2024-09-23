'use client';
import { useEffect, Fragment } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import useUserStore from '@store/auth-store';
import Avatar from './Avatar';
import SearchBar from './SearchBar';

const SignInButton = () => {
  const { data: session } = useSession();
  const isLoggedIn = useUserStore.getState().isLoggedIn;
  const { login, logout } = useUserStore();

  useEffect(() => {
    if (session) {
      login(session);
    } else {
      logout();
    }
  }, [session, login, logout]);

  const handleLogin = () => {
    signIn('spotify', { callbackUrl: '/' });
    login(session);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    logout();
  };

  return (
    <div>
      {session && session.user ? (
        <div className="flex space-x-2">
          <Avatar userId={session.user?.id} userImage={session.user?.image} />
          {/* --- Search Button --- */}
          <SearchBar />
          <button type="button" onClick={handleLogout} className="outline_btn">
            Logout
          </button>
        </div>
      ) : (
        <button type="button" onClick={handleLogin} className="black_btn">
          Login
        </button>
      )}
    </div>
  );
};

export default SignInButton;
