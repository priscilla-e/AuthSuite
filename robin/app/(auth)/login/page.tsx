import { Metadata } from "next";
import LoginForm from "./form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-3/4 mx-auto flex flex-col gap-10">
      <div className="title">
        <h1 className="text-gray-800 text-4xl font-bold py-4">Login</h1>
        <p className="w-3/4 mx-auto text-gray-400">
          Login into your Robin account
        </p>
      </div>

      <LoginForm />

      <p className="text-center text-gray-400">
        Dont have an account yet?{" "}
        <Link href="/register" className="text-blue-700">
          Register
        </Link>
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Robin App - Login",
  description: "Login into your account!",
};
