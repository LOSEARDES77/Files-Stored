import React, { useState } from "react";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../login.module.scss";
import Button from "@/components/Common/Button";
import { useRouter } from "next/router";
import { set } from "zod";
let human = null;

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [error, setError] = useState(""); 
  const router = useRouter();
  const sendModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal?.showModal();
  };
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Password and Confirm Password should be same");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          human = userCredential.user;
          console.log(human);
        },
      );
      router.push("/");
    } catch (error) {
      let err = error as Error;
      let errmsg = err.message;
      setError(errmsg.split("Firebase: ")[1] || "Something went wrong!");
      sendModal();
      setEmail("");
      setPassword("");
      setConfirm("");
    }
  };

  function focusNextInput(index: number) {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    if (index === 1) {
      if (email) {
        email.focus();
      }
    } else if (index === 2) {
      if (password) {
        password.focus();
      }
    } else if (index === 3) {
      if (confirmPassword) {
        confirmPassword.focus();
      }
    }
  }

  return (
    <div className={styles.center}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={email}
          id="email"
          placeholder="Type your email"
          onChange={(e) => setEmail(e.target.value)}
          className={`input input-bordered w-full max-w-xs ${styles.email}`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              focusNextInput(2);
            }
          }}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Type your password"
          onChange={(e) => setPassword(e.target.value)}
          className={`input input-bordered w-full max-w-xs ${styles.password}`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              focusNextInput(3);
            }
          }}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          placeholder="Re-enter your password"
          onChange={(e) => setConfirm(e.target.value)}
          className={`input input-bordered w-full max-w-xs ${styles.password}`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSignUp();
            }
          }}
        />
      </div>

      <Button
        onClick={handleSignUp}
        btnClass={`btn-info ${styles.btn}`}
        lable="Sing Up"
      />
      <div className={styles.alracc}>
        <p>Already have an account?</p>
        <Button
          btnClass={`btn-info`}
          lable="Login"
          onClick={() => router.push("/auth/login")}
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

export const aye = human;
