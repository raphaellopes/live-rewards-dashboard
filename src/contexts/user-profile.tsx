import { createContext, useContext, useState, type FC } from 'react';

interface UserProfileContextType {
  name: string;
  points: number;
  setPoints: (points: number) => void;
}

const UserProfileContext = createContext<UserProfileContextType>({
  name: '',
  points: 0,
  setPoints: () => {},
});

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

interface UserProfileProviderProps {
  children: React.ReactNode;
  name: string;
  points: number;
}
export const UserProfileProvider: FC<UserProfileProviderProps> = ({
  children,
  name,
  points,
}) => {
  const [totalPoints, setTotalPoints] = useState(points);
  return (
    <UserProfileContext.Provider
      value={{ name, points: totalPoints, setPoints: setTotalPoints }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
