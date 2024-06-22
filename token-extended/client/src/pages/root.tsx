import { Outlet } from 'react-router-dom';
import AuthProvider from '../context/auth/auth-provider';

export default function Root() {
    return (
        <AuthProvider>
            <main>
                <Outlet />
            </main>
        </AuthProvider>
    );
}
