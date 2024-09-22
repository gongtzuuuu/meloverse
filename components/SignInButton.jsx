'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

const SignInButton = () => {
  const session = useSession();
  const handleClick = () => {
    console.log('Clicked!');
    signIn('spotify', { callbackUrl: '/' });
  };
  return (
    <div>
      {session.data && session.data.user ? (
        <button type="button" onClick={signOut} className="outline_btn">
          Logout
        </button>
      ) : (
        <button type="button" onClick={handleClick} className="black_btn">
          Login
        </button>
      )}
    </div>
  );
};

export default SignInButton;
