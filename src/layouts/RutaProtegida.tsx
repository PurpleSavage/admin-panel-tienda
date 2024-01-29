import { Outlet,Navigate } from "react-router-dom"

import Aside from "../components/Aside"
import useAuth from "../hooks/useAuth"
const RutaProtegida = () => {
const {auth,cargando}=useAuth() || {auth:{
    email:"",
    firstName:"",
    lastName:"",
    password:"",
    admin:"",
    token:"",
   _id:""
}}

if (cargando || !auth._id ) {
  return <div>Cargando...</div>;
}

  return (
    <>
      {auth._id ?
      <div className=" min-h-screen flex">
        <Aside/>
        <main className=" w-5/6 p-8">
          <Outlet/>
        </main>
      </div>: 
      <Navigate to="/"/>
      }
    </>
  )
}

export default RutaProtegida