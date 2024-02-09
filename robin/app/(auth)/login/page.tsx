'use client'
import { Metadata } from "next";
import Link from "next/link";
import styles from "../form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useRef, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);



  return (
    <div className="w-3/4 mx-auto flex flex-col gap-10">
      <div className="title">
        <h1 className="text-gray-800 text-4xl font-bold py-4">Login</h1>
        <p className="w-3/4 mx-auto text-gray-400">
          Login into your Robin account
        </p>
      </div>

      <form className="flex flex-col gap-5">
        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input_text}
          />
          <span className="icon flex items-center px-4">
            <HiAtSymbol size={25} />
          </span>
        </div>
        <div className={styles.input_group}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={styles.input_text}
          />
          <span
            className="icon flex items-center px-4"
            onClick={() => setShowPassword((show) => !show)}
          >
            <HiFingerPrint size={25} />
          </span>
        </div>

        <div className={styles.button}>
          <button type="submit">Login</button>
        </div>
        <div>
          <button type="button" className={styles.oauth}>
            Sign In with Google
            <Image src="/images/google.svg" width="20" height="20" alt="icon" />
          </button>
        </div>
        <div>
          <button type="button" className={styles.oauth}>
            Sign In with Github{" "}
            <Image src="/images/github.svg" width="25" height="25" alt="icon" />
          </button>
        </div>
      </form>

      <p className="text-center text-gray-400">
        Dont have an account yet?{" "}
        <Link href="/register" className="text-blue-700">
          Register
        </Link>
      </p>
    </div>
  );
}

// export const metadata: Metadata = {
//   title: "Robin App - Login",
//   description: "Login into your account!",
// };
