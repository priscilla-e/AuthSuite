"use client";
import { useState } from "react";
import styles from "../form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    cpassword: false,
  });

  return (
    <form className="flex flex-col gap-5">
      <div className={styles.input_group}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={styles.input_text}
        />
        <span className="icon flex items-center px-4">
          <HiOutlineUser size={25} />
        </span>
      </div>
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
          type={showPassword.password ? "text" : "password"}
          name="password"
          placeholder="Password"
          className={styles.input_text}
        />
        <span
          className="icon flex items-center px-4"
          onClick={() =>
            setShowPassword((show) => ({ ...show, password: !show.password }))
          }
        >
          <HiFingerPrint size={25} />
        </span>
      </div>
      <div className={styles.input_group}>
        <input
          type={showPassword.cpassword ? "text" : "password"}
          name="password"
          placeholder="Confirm Password"
          className={styles.input_text}
        />
        <span
          className="icon flex items-center px-4"
          onClick={() =>
            setShowPassword((show) => ({ ...show, cpassword: !show.cpassword }))
          }
        >
          <HiFingerPrint size={25} />
        </span>
      </div>

      <div className={styles.button}>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}
