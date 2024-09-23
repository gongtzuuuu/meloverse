'use client';

import React, { Fragment, useEffect } from 'react';
// import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import useUserStore from '@store/auth-store';
import SignInButton from './SignInButton';
import SearchBar from './SearchBar';

const UserAuthUpdater = ({ session }) => {
  const login = useUserStore((state) => state.login);

  useEffect(() => {
    if (session) {
      login({ session });
    }
  }, [session, login]);

  return null;
};

export default UserAuthUpdater;
