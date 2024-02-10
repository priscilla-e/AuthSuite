'use client';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  // this is how we access session on the client side
  const { data: session } = useSession();

  const handleSignOut = async () => {
    signOut();
  }

  return (
    <header className=" bg-blue-400 text-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text">Robin Auth App</div>
        <nav className="space-x-4">
          {!session ? (
            <Link
              href="/login"
              className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-white"
            >
              Login
            </Link>
          ) : (
            <button type="button" className="text-white text-sm bg" onClick={handleSignOut}>
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}