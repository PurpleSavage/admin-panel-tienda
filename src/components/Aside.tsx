import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Link,useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useClothing from "../hooks/useClothing";

const Aside = () => {
    const {pathname}=useLocation()
    const {logOutClothings }=useClothing()
    const {auth, logOutAuth}=useAuth() || {auth:{
        email:"",
        firstName:"",
        lastName:"",
        password:"",
        admin:"",
        token:"",
       _id:""
    }}
   
    const handleLogOut =()=>{
        logOutClothings()
        logOutAuth()
        localStorage.removeItem('token')
       
    }
  return (
    <aside className="w-1/6 bg-zinc-200 shadow-xl ">
        <h1 className="px-4 text-xl flex flex-col items-center gap-2 mt-4 font-semibold ">
           <span className="text-purple-900 rounded-full bg-gray-400 p-2"><MdOutlineAdminPanelSettings size={40} /></span> Monroe Panel: 
           <span className="uppercase">{auth.firstName}</span>
        </h1>
        <ul className=" px-4 mt-5 space-y-4">
            <li className={`font-semibold hover:text-purple-900 ${pathname ==="/panel"? "text-purple-900":""}`}>
                <Link to="/panel">Ropa</Link>
            </li>
            <li className={`font-semibold hover:text-purple-900 ${pathname ==="/panel/agregar"? "text-purple-900":""}`}>
                <Link to="agregar">Agregar Ropa</Link>
            </li>
            <li className="font-semibold hover:text-purple-900">
                <Link to="register">Registrar</Link>
            </li>
            <li className="font-semibold hover:text-purple-900">
                <button onClick={handleLogOut}>cerrar sesión</button>
            </li>
        </ul>
             
    </aside>
  )
}

export default Aside