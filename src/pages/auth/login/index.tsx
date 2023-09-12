import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/router";
import styles from "../login.module.scss";
import Button from "@/components/Common/Button";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  let errmsg = "";
  const sendModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal?.showModal();
  };
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      let err = error as Error;
      errmsg = err.message;
      setError(errmsg.split("Firebase: ")[1] || "Something went wrong!");
      sendModal();
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={styles.center}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={email}
          placeholder="Type your email"
          onChange={(e) => setEmail(e.target.value)}
          className={`input input-bordered w-full max-w-xs ${styles.email}`}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          value={password}
          placeholder="Type your password"
          onChange={(e) => setPassword(e.target.value)}
          className={`input input-bordered w-full max-w-xs ${styles.password}`}
        />
      </div>
      <Button
        onClick={handleLogin}
        btnClass={`btn-info ${styles.btn}`}
        lable="Log in"
      />
      <div className={styles.alracc}>
        <p>Don't have an account yet?</p>
        <Button
          btnClass={`btn-info`}
          lable="Sign up"
          onClick={() => router.push("/auth/signup")}
        />
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">There was an error:<br/><br/></h3>
          <p className="py-4">
            {error}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
