'use client';
import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import useUserStore from '@store/auth-store';

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
      {isLoggedIn ? (
        <button type="button" onClick={handleLogout} className="outline_btn">
          Logout
        </button>
      ) : (
        <button type="button" onClick={handleLogin} className="black_btn">
          Login
        </button>
      )}
    </div>
  );
};

export default SignInButton;
