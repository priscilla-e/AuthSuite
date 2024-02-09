
import styles from "./layout.module.css";

console.log(styles);

import { PropsWithChildren } from "react";

export default function AuthLayout({children}: PropsWithChildren) {
  return (
    <main className="flex h-svh bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.image_container}>
          <div className={styles.cartoon}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className="flex flex-col justify-evenly bg-gray-500">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </main>
  );
}