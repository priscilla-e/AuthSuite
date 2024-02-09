import { Metadata } from "next";
import LoginForm from "../login/form";
import Link from "next/link";
import RegistrationForm from "./form";

export default function RegistrationPage() {
  return (
    <div className="w-3/4 mx-auto flex flex-col gap-10">
      <div className="title">
        <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
        <p className="w-3/4 mx-auto text-gray-400">
          Register a new Robin account
        </p>
      </div>

      <RegistrationForm />

      <p className="text-center text-gray-400">
        Already have an account?{" "}
        <Link href="/register" className="text-blue-700">
          Register
        </Link>
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Robin App - Register",
  description: "Register for a new account!",
};
