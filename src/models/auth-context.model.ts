import { Dispatch, SetStateAction } from 'react';
import { User } from './user.model';

export interface AuthContextModel {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  authToken: string;
  setAuthToken: Function;
}
