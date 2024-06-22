import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        login(email, password);
    }

    return (
        <div className="min-h-svh mx-auto container flex justify-center items-start mt-20">
            <div className="card w-1/3 bg-base-100 shadow-xl px-16 py-20">
                <h1 className="text-4xl mb-10"> Log in your account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                            value={email}
                            type="text"
                            className="grow"
                            placeholder="Username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            value={password}
                            type="password"
                            className="grow"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </label>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
                <div className='mt-10'>
                    <span> Not yet registered?</span>
                    <Link to="/register" className="text-primary"> Create a new account</Link>
                </div>
            </div>
        </div>
    );
}
