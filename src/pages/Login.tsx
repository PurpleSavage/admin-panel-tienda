import { useState } from "react"
import { FormEvent } from 'react'
import useAuth from "../hooks/useAuth"
import { objUser } from "../interfaces/interfacesAuth"
import { useNavigate } from "react-router-dom"
import MessageAlert from "../components/MessageAlert"
import { ErrorMessageInterface } from "../interfaces/interfaceObj"

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {setAuth,setCargando}=useAuth() ||{setAuth:()=>{}}

  const[alert,setAlert]=useState<ErrorMessageInterface>({
    errorState: false,
    msg: ""
  })
  const navigate=useNavigate()

  const handleSubmit =async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if([email,password].includes("")){
      setAlert({ 
        errorState: true, 
        msg: "Los campos son obligatorios" 
      })
      setTimeout(() => {
        setAlert({ errorState: false, msg: "" });
      }, 3000)
      return
    }
    setCargando(true)
    try {
      const response = await fetch('http://localhost:4000/api/user/auth',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ email, password })
      })
      const data:objUser|ErrorMessageInterface = await response.json()
      if('token' in data){
        localStorage.setItem("token",data.token)
        setAuth(data)
        navigate('/panel')
        setCargando(false)
        return
      }
      setAlert({ 
        errorState: true, 
        msg: data.msg
      })
      setTimeout(() => {
        setAlert({ errorState: false, msg: "" });
      }, 3000)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h1 className="text-4xl font-semibold">Ingresa a tu panel de{' '} 
        <span className="text-purple-700">Monroe</span><span className="text-pink-600">.Shop</span>
      </h1>
      {alert.msg.length ?<MessageAlert alert={alert}/>:null}
      <form className="my-4 shadow-2xl px-8 py-5 rounded-md bg-white  space-y-4 " onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label 
            htmlFor="email" 
            className="text-lg"
          >Email</label>
          <input 
            type="email" 
            id="email"
            className="border-b border-black h-8 pl-2 "
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label 
            htmlFor="password" 
            className="text-lg"
          >Password</label>
          <input 
            type="password" 
            id="password"
            className="border-b border-black h-8 pl-2"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <input 
          type="submit" 
          value="Sign up" 
          className="text-lg text-center p-2 rounded-md 
          bg-purple-600 transition-colors w-full text-white cursor-pointer hover:bg-purple-700"
        />
      </form>
      
    </>
  )
}

export default Login