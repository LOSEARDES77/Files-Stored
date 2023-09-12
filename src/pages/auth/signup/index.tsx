import React, { useState } from "react";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../login.module.scss";
import Button from "@/components/Common/Button";
import { useRouter } from "next/router";
let human = null;

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const router = useRouter();
  let user = null;
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
      // Handle sign-up errors
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
          placeholder="Type your password"
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
    </div>
  );
}

export const aye = human;
