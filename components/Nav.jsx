import { cookies, headers } from 'next/headers';
import { getServerSession as originalGetServerSession } from 'next-auth';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/favicon.png';
import SignInButton from './SignInButton';
import SearchBar from './SearchBar';
import UserAuthUpdater from './UserAuthUpdater';
import Avatar from './Avatar';
import { Fragment } from 'react';

const getServerSession = async () => {
  try {
    const req = {
      headers: Object.fromEntries(headers()),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value])
      ),
    };
    const res = { getHeader() {}, setCookie() {}, setHeader() {} };
    const session = await originalGetServerSession(req, res, authOptions);
    return session;
  } catch (error) {
    console.log('error from getAllSongPost func. on Nav', error);
  }
};

const Nav = async () => {
  const session = await getServerSession(authOptions);
  console.log('session', session);
  //   {
  //   user: {
  //     name: 'liangtzuuuu',
  //     email: 'claireliang2012@gmail.com',
  //     image: 'https://i.scdn.co/image/ab67757000003b82f34daa8da2670d145a85cab5',
  //     id: '64b24897142bdd5458e38a6d'
  //   },
  //   expires: '2024-10-23T05:33:31.505Z',
  //   accessToken: 'BQBadNK2RaTXqJJOamuPYd9lPLad9X6svrw7qWqaDusNxjXbWJj-EpD_HTheeqGF9Ov6tCMrZkaWSYesSTdVAy5MvpOQs2SoZkSe3lonfucc2ZHn3kOR2MUp34YzxGH5SOmJIDWswqr5comJTeTrRgjF7k4Y0wllIlNuM5k77KjLJL-AqB1AsbVAlQ9Wq-j0rXblc6XNPnPjBjXEl800wEjKrjuxAZyilD_AdJP4nCGVrBo'
  // }

  return (
    <Fragment>
      <UserAuthUpdater session={session} />
      <nav className="flex-between w-full mb-16 pt-3">
        {/* --------- */}
        {/* Logo Area */}
        {/* --------- */}
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src={logo}
            alt="meloverse Logo"
            width={45}
            height={45}
            className="object-contain rounded-full"
          />
          <p className="logo_text black_gradient">meloverse</p>
        </Link>
        {/* --------------- */}
        {/* Navigation Area */}
        {/* --------------- */}
        <div className="flex gap-3 md:gap-5 relative">
          {/* {session && session.user ? (
          <UserAuthUpdater
            userId={session.user.id}
            userImage={session.user.image}
          />
        ) : (
          <SignInButton />
        )} */}
          {session && session.user && <>{/* --- Profile Picture --- */}</>}
          {/* --- Logout Button --- */}
          <SignInButton />
        </div>
      </nav>
    </Fragment>
  );
};

export default Nav;
