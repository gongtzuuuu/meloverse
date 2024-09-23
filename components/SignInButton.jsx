'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

const SignInButton = () => {
  const session = useSession();
  // const setLogin = useUserStore((state) => state.login);
  // const setLogout = useUserStore((state) => state.logout);

  // const handleSignIn = () => {
  //   signIn('spotify', { callbackUrl: '/' });
  //   setLogin(session.user.id);
  // };

  // const handleSignOut = () => {
  //   signOut();
  //   setLogout();
  //   router.push('/');
  // };
  return (
    <div>
      {session.data && session.data.user ? (
        <button
          type="button"
          onClick={() => signOut('spotify', { callbackUrl: '/' })}
          className="outline_btn"
        >
          Logout
        </button>
      ) : (
        <button
          type="button"
          onClick={() => signIn('spotify', { callbackUrl: '/' })}
          className="black_btn"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default SignInButton;
