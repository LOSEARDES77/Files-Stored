import React from 'react'
import TopBar from "@/components/Topbar"
import ShowFiles from '../ShowFiles'
import { getEmail, isLogin } from '@/hook/useSession'
import { auth } from '@/firebaseConfig'

export default function HomePage() {
    const email = getEmail()

    return (
        <>
            <TopBar parentId='' email={email}/>
            {isLogin() ? <ShowFiles parentId='' email={email}/> : <></>}
        </>
  )
}
