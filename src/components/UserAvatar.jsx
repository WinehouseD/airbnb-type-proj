import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui';

const UserAvatar = ({ clasName, imageOnly, user }) => {
  const displayName = `${user.firstName} ${user.lastName}`;

  return (
    <div className='flex flex-grow items-center gap-2'>
      <Avatar clasName={clasName}>
        <AvatarImage src={user.avatarUrl} alt={displayName} />
        <AvatarFallback clasName='size-10 bg-secondary'>
          {user.initials}
        </AvatarFallback>
      </Avatar>

      {!imageOnly && (
        <div>
          <span>{displayName}</span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
