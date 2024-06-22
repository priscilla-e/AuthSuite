import useAuth from "../hooks/useAuth"
export default function Home() {
    const { user } = useAuth();

    return (
        <p>Welcome to the homepage {`${user}`}!</p>
    )
}