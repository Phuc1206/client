import { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
const AuthContext = createContext('');

function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        username: '',
        id: 0,
        is_admin: false,
        status: false,
    });
    useEffect(() => {
        authService.getUser().then((user) => {
            if (user.error) {
                setAuthState({ ...authState, status: false });
            } else {
                setAuthState({
                    username: user.username,
                    id: user.id,
                    is_admin: user.is_admin,
                    status: true,
                });
            }
        });
    }, []);
    return <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>;
}
export { AuthContext, AuthProvider };
