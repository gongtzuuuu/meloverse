'use client';

import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useUserStore from '@store/auth-store';
import SignInButton from './SignInButton';
import SearchBar from './SearchBar';

const UserAuthUpdater = ({ userId, userImage }) => {
  const login = useUserStore((state) => state.login);

  useEffect(() => {
    if (userId) {
      login({ id: userId });
    }
  }, [userId, login]);

  if (!userId) return <SignInButton />;

  return (
    <Fragment>
      <Link href={`/profile/${userId}`}>
        <Image
          src={userImage ? userImage : 'not found'}
          alt="profile"
          width={37}
          height={37}
          className="rounded-full"
        />
      </Link>
      <SearchBar />
      <SignInButton />
    </Fragment>
  );
};

export default UserAuthUpdater;
