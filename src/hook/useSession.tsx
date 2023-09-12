import { auth } from '@/firebaseConfig'

export const userFetchSession = () => {
    const session = auth.currentUser
    return session
}

export const getEmail = () => {
    return auth.currentUser?.email as string
}

export const isLogin = () => {
    return auth.currentUser !== null
}
console.log("src/hook/useSession.tsx")
console.log("userFetchSession: ", userFetchSession())
console.log("getEmail: ", getEmail())