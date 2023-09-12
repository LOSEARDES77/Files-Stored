
interface Button {
    btnClass?: string
    lable: string | JSX.Element
    onClick?: () => void
}

interface Progress {
    progress: number
}

interface GithubAuth {
    clientId: string
    clientSecret: string
}

interface ArrayType {
    [key: string]: any
}


