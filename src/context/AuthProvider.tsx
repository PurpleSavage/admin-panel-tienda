import { createContext,useState,useEffect } from "react"
import { AuthProviderProps,AuthProviderContextProps } from "../interfaces/interfacesAuth"
import { objUser } from "../interfaces/interfacesAuth"
import { useNavigate } from "react-router-dom"

const AuthContext =createContext<AuthProviderContextProps|null>(null)
const AuthProvider:React.FC<AuthProviderProps>=({children})=>{
    const [cargando,setCargando]=useState(false)
    const navigate =useNavigate()
    const[auth,setAuth]=useState<objUser| {}>({})
    useEffect(()=>{
        const autenticarUsuario= async()=>{
            const token =localStorage.getItem("token")
            
            if (!token || token === "undefined" || token === "null") {
                return;
            }
            const config={
                headers:{
                    "Content-Type" :"application/json",
                    Authorization:`Bearer ${token}`   
                }
            }
            
            try {
                const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/perfil`,config)
                if (!response.ok) {
                    console.error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
                    return;
                }
                const data = await response.json();
                setAuth(data)     
            } catch (error) {
                console.log(error)
            }
        }
        autenticarUsuario()
    },[])
  
   const logOutAuth=()=>{
        setAuth({})
        navigate("/")
   }
    return(
        <AuthContext.Provider
            value={{
                auth:auth as objUser,
                setAuth,
                logOutAuth,
                cargando,
                setCargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext