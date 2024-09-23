import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Avatar = ({ userId, userImage }) => {
  return (
    <Link href={`/profile/${userId}`}>
      <Image
        src={userImage}
        alt="profile"
        width={37}
        height={37}
        className="rounded-full"
      />
    </Link>
  );
};

export default Avatar;
