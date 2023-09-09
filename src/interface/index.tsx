
interface Button {
    btnClass?: string
    lable: string
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
    map: Function
}

interface imageCard {
    src: string
    title: string
    lable?: string
    className?: string
}