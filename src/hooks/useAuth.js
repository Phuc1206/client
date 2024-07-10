import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('accessToken');
        return !!token;
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);
    return isAuthenticated;
};

export default useAuth;
