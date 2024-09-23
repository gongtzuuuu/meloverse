import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Avatar = ({ userId, userImage }) => {
  return (
    <Link href={`/profile/${userId}`}>
      {userImage ? (
        <Image
          src={userImage}
          alt="profile"
          width={37}
          height={37}
          className="rounded-full"
        />
      ) : (
        <div className="w-2 h-2 rounded-full bg-slate-50"></div>
      )}
    </Link>
  );
};

export default Avatar;
