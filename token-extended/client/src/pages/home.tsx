import useAuth from "../hooks/useAuth"
export default function Home() {
    const { user } = useAuth();

    return (
        <h1 className="text-4xl">Welcome to the homepage {`${user}`}!</h1>
    )
}