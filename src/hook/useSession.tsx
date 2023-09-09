import { useSession } from "next-auth/react"

export const userFetchSession = () => {
    const {data: session} = useSession()

    return ( session )
}