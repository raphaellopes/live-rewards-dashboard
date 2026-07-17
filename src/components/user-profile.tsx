import { type FC } from 'react';

import { formatPoints } from '../utils/format-points';

interface UserProfileProps {
  name: string;
  points: number;
}

const UserProfile: FC<UserProfileProps> = ({ name, points }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <h1 className="font-medium">{name}</h1>
        <span className="text-sm text-gray-500">{formatPoints(points)}</span>
      </div>
    </div>
  );
};

export default UserProfile;
