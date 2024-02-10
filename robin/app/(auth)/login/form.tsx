"use client";
import styles from "../form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import {  useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
      password: Yup.string()
        .min(4, "Must be atleast 4 characters long!")
        .required("Password is required!"),
    }),
    onSubmit: async (values, {setStatus, setErrors, setSubmitting}) => {
      // Sign in with credentials username and password
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
      if (response?.error) {
        setStatus({ error: "Invalid username or password" });
      }
      else {
        // Auth Success: redirect user to dashboard
        router.push("/");
      }
    },
  });

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "/" });
  };
  const handleGithubSignIn = async () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <span className="text-rose-500 text-sm">{formik.status?.error ?? null }</span>

      <div className={styles.input_group}>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className={styles.input_text}
          {...formik.getFieldProps("email")}
        />
        <span className="icon flex items-center px-4">
          <HiAtSymbol size={25} />
        </span>
      </div>
      {formik.touched.email && formik.errors.email ? (
        <span className="text-rose-500 text-sm">{formik.errors.password}</span>
      ) : null}
      <div className={styles.input_group}>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className={styles.input_text}
          {...formik.getFieldProps("password")}
        />
        <span
          className="icon flex items-center px-4"
          onClick={() => setShowPassword((show) => !show)}
        >
          <HiFingerPrint size={25} />
        </span>
      </div>
      {formik.touched.password && formik.errors.password ? (
        <span className="text-rose-500 text-sm">{formik.errors.password}</span>
      ) : null}
      <div className={styles.button}>
        <button type="submit">Login</button>
      </div>
      <div>
        <button
          type="button"
          className={styles.oauth}
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
          <Image src="/images/google.svg" width="20" height="20" alt="icon" />
        </button>
      </div>
      <div>
        <button
          type="button"
          className={styles.oauth}
          onClick={handleGithubSignIn}
        >
          Sign In with Github
          <Image src="/images/github.svg" width="25" height="25" alt="icon" />
        </button>
      </div>
    </form>
  );
}
