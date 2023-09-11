import React, { useState }  from 'react'
import { auth } from '@/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from '../login.module.scss'
import Button from '@/components/Common/Button'
import { useRouter } from 'next/router';
let human = null;

export default function SingUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');
    const router = useRouter()
    let user = null;
    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert("Password and Confirm Password should be same");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                human = userCredential.user;
                console.log(human);
            });
            router.push("/")
        } catch (error) {
        // Handle sign-up errors
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
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input type="password" value={confirmPassword} placeholder='Type your password' onChange={(e) => setConfirm(e.target.value)} className={`input input-bordered w-full max-w-xs ${styles.password}`} />
        </div>
        <Button onClick={handleSignUp} btnClass={`btn-info ${styles.btn}`} lable="Sing Up"/>
      </div>
    );
}

export const aye = human;