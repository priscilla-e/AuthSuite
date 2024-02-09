"use client";
import styles from "../form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import {  useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
  );
}
