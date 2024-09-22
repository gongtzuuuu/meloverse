'use client';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import useUserStore from '@store/auth-store';

const SignInButton = () => {
  const session = useSession();
  const router = useRouter();
  const setLogin = useUserStore((state) => state.login);
  const setLogout = useUserStore((state) => state.logout);

  const handleSignIn = () => {
    signIn('spotify', { callbackUrl: '/' });
    setLogin(session.user.id);
  };

  const handleSignOut = () => {
    signOut();
    setLogout();
    router.push('/');
  };
  return (
    <div>
      {session.data && session.data.user ? (
        <button type="button" onClick={handleSignOut} className="outline_btn">
          Logout
        </button>
      ) : (
        <button type="button" onClick={handleSignIn} className="black_btn">
          Login
        </button>
      )}
    </div>
  );
};

export default SignInButton;
