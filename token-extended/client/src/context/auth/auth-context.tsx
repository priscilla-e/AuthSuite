import { createContext } from "react";
import { User } from "../../types";

interface AuthContextState {
    user: User | null;
    error: any;
    loading: boolean;
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextState>({
    user: null,
    error: null,
    loading: false,
    login: () => {},
    register: () => {},
    logout: () => {}
});

export default AuthContext;