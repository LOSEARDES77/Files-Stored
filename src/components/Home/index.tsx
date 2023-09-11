import React from 'react'
import TopBar from "@/components/Topbar"
import ShowFiles from '../ShowFiles'
import { userFetchSession } from '@/hook/useSession'

export default function HomePage() {
    let session = userFetchSession()
    return (
        <>
            <TopBar parentId=''/>
            {session ? <ShowFiles parentId=''/> : <></>}
        </>
  )
}
