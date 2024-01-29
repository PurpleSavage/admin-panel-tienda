
import { FormEvent, useState } from 'react'
import MessageAlert from "../components/MessageAlert"
import { ErrorMessageInterface } from "../interfaces/interfaceObj"
import { useNavigate } from "react-router-dom"
const Register = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const[secondPassword,setSecondPassword]=useState("")

  const navigate=useNavigate()
  const[alert,setAlert]=useState<ErrorMessageInterface>({
    errorState: false,
    msg: ""
  })

  const handleSubmit =async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if([email,password,firstName,lastName].includes("")){
      setAlert({ 
        errorState: true, 
        msg: "Los campos son obligatorios" 
      })
      setTimeout(() => {
        setAlert({ errorState: false, msg: "" });
      }, 3000)
      return
    }
    if(password !== secondPassword){
      setAlert({ 
        errorState: true, 
        msg: "las contraseñas no coinciden" 
      })
      setTimeout(() => {
        setAlert({ errorState: false, msg: "" });
        navigate('/')
      }, 3000)
      return
    }
    const admin =true
    try {
      const response = await fetch('http://localhost:4000/api/user/createUser',{
        method:"POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        
        body: JSON.stringify({ email, password,firstName,lastName,admin})
      })
      const data:ErrorMessageInterface=await response.json()
      if(response.status!==200){
        
        setAlert({ 
          errorState: true, 
          msg: data.msg
        })
        setTimeout(() => {
          setAlert({ errorState: false, msg: "" });
        }, 3000)
        return
      }
    
      setAlert({ 
        errorState: false, 
        msg: data.msg
      })
      setTimeout(() => {
        setAlert({ errorState: false, msg: "" });
        navigate('/')
      }, 3000)
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-4xl font-medium">Regístra un nuevo empleado en{" "}
        <span className="text-purple-700">Monroe</span><span className="text-pink-600">.Shop</span>
      </h1>
      {alert.msg.length ?<MessageAlert alert={alert}/>:null}
      <form className="my-4 shadow-2xl px-8 py-5 rounded-lg  space-y-4 w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label 
            htmlFor="email" 
            className="text-lg"
          >Email</label>
          <input 
            type="email" 
            id="email"
            className="border-b border-black h-8 pl-2"
            onChange={e=>setEmail(e.target.value)}
            placeholder="example@gmail.com"
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
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label 
            htmlFor="password2" 
            className="text-lg"
          >Repetir password</label>
          <input 
            type="password" 
            id="password2"
            className="border-b border-black h-8 pl-2"
            onChange={e=>setSecondPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label 
            htmlFor="firstName" 
            className="text-lg"
          >First Name</label>
          <input 
            type="text" 
            id="firstName"
            className="border-b border-black h-8 pl-2"
            onChange={e=>setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label 
            htmlFor="lastName" 
            className="text-lg"
          >Last Name</label>
          <input 
            type="text" 
            id="lastName"
            className="border-b border-black h-8 pl-2"
            onChange={e=>setLastName(e.target.value)}
          />
        </div>
        <input 
          type="submit" 
          value="Crear cuenta" 
          className="text-lg text-center p-2 rounded-md 
          bg-purple-600 transition-colors w-full text-white cursor-pointer hover:bg-purple-700"
        />
      </form>
      
    </div>
  )
}

export default Register