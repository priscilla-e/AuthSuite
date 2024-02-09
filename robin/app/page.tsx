import Link from "next/link";
import { getServerSession } from "next-auth/next";
import authOptions from "@/auth-options";
import Header from "./header";

export default async function Home() {
  // Accessing the session from the server side (sever components & routes)
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />

      <main className="container mx-auto text-center py-20">
        <h3 className="text-2xl">
          Welcome to <span className="text-indigo-500">Robin!</span>
        </h3>

        {/* User details */}
        <div className="mt-10">
          {!session && <p> You&apos;re not Authenticated! </p>}

          {session && (
            <div>
              <p> {session.user?.name}</p>
              <p> {session.user?.email}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
