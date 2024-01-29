export interface AuthProviderProps {
    children: ReactNode;
}
export type objUser={
    email:string,
    firstName:string,
    lastName:string,
    password:string,
    admin:boolean,
    token:string
    _id:string
}

export interface AuthProviderContextProps{
    auth:objUser,
    setAuth:React.Dispatch<React.SetStateAction<{} | objUser>>
    logOutAuth:()=>void
    cargando:boolean
    setCargando:Dispatch<SetStateAction<boolean>>
}