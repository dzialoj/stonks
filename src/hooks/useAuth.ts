import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import { User } from '../models/user.model';
import { AuthContext } from '../providers/auth/auth.context';
import { v4 as uuidv4 } from 'uuid';

export interface UseAuthConfig {
  updateAuthToken: (token: string) => void;
  removeAuthToken: () => void;
  initializeAuth: () => void;
  checkExistingAuthorization: () => boolean;
  getDecodedUserId: () => string;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  currentUser: User;
  authToken: string;
}

export default function useAuth(): UseAuthConfig {
  const AUTH_TOKEN_STORAGE_KEY = 'APPROVALS_AUTH_KEY';
  const LOCAL_STORAGE_KEY_NONCE = 'APPROVALS_NONCE_KEY';
  const LOCAL_STORAGE_KEY_STATE = 'APPROVALS_STATE_KEY';

  const { currentUser, setCurrentUser, setAuthToken, authToken } =
    useContext(AuthContext);

  const checkExistingAuthorization = (): boolean => {
    const existingToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (existingToken) {
      const decoded = jwt_decode(existingToken);
      //   TODO: Check expiration
      setAuthToken(existingToken);
      return true;
    }

    return false;
  };

  const initializeAuth = (): void => {
    try {
      const state = uuidv4();
      const nonce = uuidv4();
      localStorage.setItem(LOCAL_STORAGE_KEY_NONCE, nonce);
      localStorage.setItem(LOCAL_STORAGE_KEY_STATE, state);
      const url = `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_AUTHORITY}/oauth2/v2.0/authorize?response_type=id_token&client_id=${process.env.REACT_APP_AZURE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_AZURE_REDIRECT_URI}&scope=openid&response_mode=fragment&nonce=${nonce}&state=${state}`;
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  };

  const updateAuthToken = (token: string): void => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    setAuthToken(token);
  };

  const removeAuthToken = (): void => {
    const existingToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    console.log(existingToken)
    if (existingToken) {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      setAuthToken(null);
      const url = new URL(window.location.href);
      window.location.href = `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${url.origin}`;
    }
  };

  const getDecodedUserId = (): string => {
    if (!authToken) {
      removeAuthToken();
    }
    const decode = jwt_decode(authToken);
    console.log(decode);
    return (decode as any).UserId.toString();
  };

  return {
    updateAuthToken,
    removeAuthToken,
    initializeAuth,
    checkExistingAuthorization,
    authToken,
    currentUser,
    setCurrentUser,
    getDecodedUserId,
  };
}