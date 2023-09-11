import React from 'react'
import { useRouter } from 'next/router'
import TopBar from '@/components/Topbar'
import ShowFiles from '@/components/ShowFiles'


export default function Folder() {
  let router = useRouter()
  let uuid = router?.query?.id
  return (
    <>
      <TopBar parentId={uuid as string} />
      <ShowFiles parentId={uuid as string} />
    </>
  )
}
