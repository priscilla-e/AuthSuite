"use client";
import { useState } from "react";
import styles from "../form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    cpassword: false,
  });
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4, "Must be atleast 4 characters long!").required("User name is required!"),
      email: Yup.string().email("Invalid email address").required("Email is required!"),
      password: Yup.string().min(4, "Must be atleast 4 characters long!").required("Password is required!"),
      cpassword: Yup.string().oneOf([Yup.ref("password"), ""], "Passwords do not match!").required("Confirm password is required!"),
    }),
    onSubmit: async (values, {setStatus}) => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          const errorData = await response.json()
          setStatus({error: errorData.error})
          return
        }

        // SUCCESS: redirect to login page
        router.push('/login')
      }catch (e) {
        setStatus({error: 'Request Failed!: Please try again later.'})
      }
    },
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <span className="text-rose-500 text-sm">
        {formik.status?.error ?? null}
      </span>
      <div className={styles.input_group}>
        <input
          id="name"
          type="text"
          placeholder="Name"
          className={styles.input_text}
          {...formik.getFieldProps("name")}
        />
        <span className="icon flex items-center px-4">
          <HiOutlineUser size={25} />
        </span>
      </div>
      {formik.touched.name && formik.errors.name ? (
        <span className="text-rose-500 text-sm">{formik.errors.name}</span>
      ) : null}
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
        <span className="text-rose-500 text-sm">{formik.errors.email}</span>
      ) : null}
      <div className={styles.input_group}>
        <input
          id="password"
          type={showPassword.password ? "text" : "password"}
          placeholder="Password"
          className={styles.input_text}
          {...formik.getFieldProps("password")}
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
      {formik.touched.password && formik.errors.password ? (
        <span className="text-rose-500 text-sm">{formik.errors.password}</span>
      ) : null}
      <div className={styles.input_group}>
        <input
          id="cpassword"
          type={showPassword.cpassword ? "text" : "password"}
          placeholder="Confirm Password"
          className={styles.input_text}
          {...formik.getFieldProps("cpassword")}
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
      {formik.touched.cpassword && formik.errors.cpassword ? (
        <span className="text-rose-500 text-sm">{formik.errors.cpassword}</span>
      ) : null}

      <div className={styles.button}>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}
