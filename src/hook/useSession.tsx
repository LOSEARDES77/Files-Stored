import { auth } from '@/firebaseConfig'
import { useState, useEffect } from 'react'

export const useSession = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setIsLogin(true)
            setEmail(user.email!)
        } else {
            setIsLogin(false)
            setEmail('')
        }
    })

    return unsubscribe
  }, [])

  return { isLogin, email }
}