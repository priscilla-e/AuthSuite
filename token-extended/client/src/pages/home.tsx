import useAuth from '../hooks/useAuth';
export default function Home() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen container mx-auto flex space-x-4 items-center justify-center">
            <div className="card w-1/3 bg-base-100 shadow-xl px-16 py-20">
                <h1 className="text-4xl">
                    Welcome to the homepage {`${user?.email}`}!
                </h1>
                <button className="btn btn-primary" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
