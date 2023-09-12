import React from 'react'
import TopBar from "@/components/Topbar"
import ShowFiles from '../ShowFiles'
import { useSession } from '@/hook/useSession'

export default function HomePage() {
    const { isLogin, email } = useSession()
    
    return (
        <>
            <TopBar parentId='' email={email}/>
            {isLogin ? <ShowFiles parentId='' email={email}/> : <></>}
        </>
  )
}
