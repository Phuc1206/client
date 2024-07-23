import { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import Loading from '../components/Loading';
const AuthContext = createContext('');

function AuthProvider({ children }) {
    const [authState, setAuthState] = useState(() => {
        const savedAuthState = localStorage.getItem('authState');
        return savedAuthState
            ? JSON.parse(savedAuthState)
            : {
                  username: '',
                  id: 0,
                  is_admin: false,
                  status: false,
              };
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService.getUser().then((user) => {
            if (user.error) {
                setAuthState((prevState) => ({ ...prevState, status: false }));
                localStorage.removeItem('authState');
            } else {
                const newAuthState = {
                    username: user.username,
                    id: user.id,
                    is_admin: user.is_admin,
                    status: true,
                };
                setAuthState(newAuthState);
                localStorage.setItem('authState', JSON.stringify(newAuthState));
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
