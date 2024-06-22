import { useEffect, useState } from 'react';
import AuthContext from './auth-context';
import { User } from '../../types';
import * as authApi from '../../api/auth';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    const navigate = useNavigate();
    const location = useLocation();

    // Reset the error state if we change page
    useEffect(() => {
        if (error) setError(undefined);
    }, [location.pathname]);

    // Check if the user is logged in
    useEffect(() => {
        authApi
            .getCurrentUser()
            .then((user) => {
                setUser(user);
            })
            .catch((_error) => {})
            .finally(() => setLoadingInitial(false));
    }, []);

    function login(email: string, password: string) {
        setLoading(true);

        authApi
            .login(email, password)
            .then(({ user }) => {
                setUser(user);
                navigate('/');
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    function register(email: string, password: string) {
        setLoading(true);

        authApi
            .register(email, password)
            .then(({ msg }) => {
                console.log(msg);
                navigate('/login');
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    function logout() {
        authApi
            .logout()
            .then(() => {
                setUser(null);
                navigate('/login');
            })
            .catch((error) => console.log(error));
    }

    const memoizedValue = useMemo(
        () => ({ user, loading, error, login, register, logout }),
        [user]
    );

    if (loadingInitial) return <p>Loading...</p>;

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
}
