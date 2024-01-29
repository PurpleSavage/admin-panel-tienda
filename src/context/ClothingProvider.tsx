import { createContext } from "react"
import { ClothingProviderProps,ClothingProviderContextProps } from "../interfaces/interfacesClothing"
import { useEffect,useState } from "react"
import {ClothingInterface } from "../interfaces/interfacesClothing"
import useAuth from "../hooks/useAuth"

const ClothingContext =createContext<ClothingProviderContextProps |null>(null)

const ClothingProvider:React.FC<ClothingProviderProps> = ({children}) => {
    const [listClothing,setListClothing]=useState<ClothingInterface[]>([])
    const [modalEdit,setModalEdit]=useState(false)
    const [idClothing,setIdClothing]=useState("")
    const [loader,setLoader]=useState(false)
    const [successModal,setSuccessModal]=useState(false)
    const [warning,setWarning]=useState(false)
    const [msg,setMsg]=useState("")
    const {auth}=useAuth()
    useEffect(()=>{
        const getAllClothings =async()=>{
            const response= await fetch(`${import.meta.env.VITE_BACKEND_URL}/clothing/all`)
            const data = await response.json()
            setListClothing(data)
  
        }
        getAllClothings()
    },[auth])
    console.log(listClothing)
    const handleSendClothingCreate=async(clothing:ClothingInterface,formData:FormData)=>{
        const token =localStorage.getItem("token")
            
        if (!token || token === "undefined" || token === "null") {
            return;
        }
        setLoader(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/clothing/create`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization:`Bearer ${token}` 
                },
                body: JSON.stringify(clothing)
            })
            
            const {_id} = await response.json()
            
            if(response.status===200){
                const fileResponse=await fetch(`${import.meta.env.VITE_BACKEND_URL}/images/uploadFile/${_id}`,{
                method:'POST',
                headers: {
                    Authorization:`Bearer ${token}` 
                },
                body: formData
                })
                //const data=await response.json()
                const dataFile=await fileResponse.json()
                setListClothing([...listClothing,dataFile])
                setLoader(false)
                setSuccessModal(true)
                setMsg("Agregado correctamente")
            }
            if(response.status !==200){
                console.log("hola")
            }
           
        } catch (error) {
            setLoader(false)
            setSuccessModal(true)
            setMsg("Error al crear el elemento")
            console.log(error)
        }
    }
    const editClothingSubmit =async(clothing:ClothingInterface)=>{
        
        const token =localStorage.getItem("token")
       
            
        if (!token || token === "undefined" || token === "null") {
            
            return;
        }
        setLoader(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/clothing/edit/${clothing._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization:`Bearer ${token}` 
                },
                body: JSON.stringify(clothing)
            })
            const data:ClothingInterface = await response.json()
            const listClothingUpdate = listClothing.map(element=>element._id===data._id? {...data}:{...element})
            setListClothing(listClothingUpdate) 
            setLoader(false)
            setSuccessModal(true)
            setMsg("Los cambios se agregaron con éxito")
        } catch (error) {
            setLoader(false)
            setSuccessModal(true)
            setMsg("Error al subir los cambios")
            console.log(error)
        }
    }
    const handleSubmitDeleteModal=async(id:string,fileFirst:string,fileSecond:string)=>{
        const nameFileFirst=fileFirst
        const nameFileSecond=fileSecond
        const token =localStorage.getItem("token")  
        if (!token || token === "undefined" || token === "null") {
            console.log("no hay token")
            return;
        }
        setLoader(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/clothing/delete/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization:`Bearer ${token}` 
                },     
            })
            if(response.status===200){
                const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/images/deleteImageFirebase/${nameFileFirst}/${nameFileSecond}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json', 
                        Authorization:`Bearer ${token}` 
                    },     
                })
                const {msg} = await data.json()
                const listUpdate = listClothing.filter(element=>element._id!==id)
                setListClothing(listUpdate)
                setLoader(false)
                setSuccessModal(true)
                setMsg(msg)
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
            setSuccessModal(true)
            setMsg("Error al eliminar el elemento")
        }
    }
    const logOutClothings=()=>{
        setListClothing([])
        setIdClothing("")
        setMsg("")
    }
  return (
    <ClothingContext.Provider
        value={{
            listClothing,
            handleSendClothingCreate,
            modalEdit,
            setModalEdit,
            idClothing,
            setIdClothing,
            editClothingSubmit,
            loader,
            setLoader,
            successModal,
            setSuccessModal,
            handleSubmitDeleteModal,
            warning,
            setWarning,
            msg,
            logOutClothings,
          
        }}
    >
        {children}
    </ClothingContext.Provider>
  )
}

export {ClothingProvider}
export default ClothingContext