import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { useRouter } from 'next/router'
import styles from '../login.module.scss'
import Button from '@/components/Common/Button'

export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    
    const handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth ,email, password);
        router.push("/")
      } catch (error) {
        alert((error as Error).message);
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
          <input type="email" value={email} placeholder='Type your email' onChange={(e) => setEmail(e.target.value)} className={`input input-bordered w-full max-w-xs ${styles.email}`}  />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" value={password} placeholder='Type your password' onChange={(e) => setPassword(e.target.value)} className={`input input-bordered w-full max-w-xs ${styles.password}`} />
        </div>
        <Button onClick={handleLogin} btnClass={`btn-info ${styles.btn}`} lable="Log in"/>
        <div className={styles.alracc}>
        <p>Don't have an account yet?</p>
        <Button
          btnClass={`btn-info`}
          lable="Sign up"
          onClick={() => router.push("/auth/signup")}
        />
      </div>
      </div>
    );
}
