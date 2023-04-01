import { FC, useState } from 'react';
import { User } from '../../models/user.model';
import { AuthContext } from './auth.context';

export interface AuthContextProviderProps {
  children: JSX.Element;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string>(null);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, setAuthToken, authToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
