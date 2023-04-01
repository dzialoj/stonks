import { createContext } from "react";
import { AuthContextModel } from '../../models/auth-context.model';

const defaultContext: AuthContextModel = {
    currentUser: null,
    setCurrentUser: () => {},
    authToken: null,
    setAuthToken: () => {},
};

export const AuthContext = createContext<AuthContextModel>(defaultContext);