import { auth } from '@/firebaseConfig'

export const userFetchSession = () => {
    const session = auth.currentUser
    return session
}

export const getEmail = () => {
    return auth.currentUser?.email as string
}

