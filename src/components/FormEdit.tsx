import { IoIosClose } from "react-icons/io";
import useClothing from "../hooks/useClothing";
import { useEffect,useState,FormEvent } from "react";
import { ClothingInterface, objTypeBopdy } from "../interfaces/interfacesClothing";
import { ErrorMessageInterface } from "../interfaces/interfaceObj";
import MessageAlert from "./MessageAlert";
const FormEdit = () => {
    const {setModalEdit,idClothing,listClothing,editClothingSubmit}=useClothing() || {} 
    const[alert,setAlert]=useState<ErrorMessageInterface>({
        errorState: false,
        msg: ""
      })
    const[nombre,setNombre]=useState("")
    const [descripcion,setDescripcion]=useState("")
    const [talla,setTalla]=useState("")
    const [precio,setPrecio]=useState("")
    const [typeClothing,setTypeClothing]=useState<objTypeBopdy >()
    useEffect(()=>{
        const getClothingEdit=()=>{
            if(listClothing){
                const objEdit = listClothing.filter(element=>element._id===idClothing)[0]
                setNombre(objEdit.nombre)
                setDescripcion(objEdit.descripcion)
                setTalla(objEdit.talla)
                setPrecio(objEdit.precio.toString())
                setTypeClothing(objEdit.typeBody)
            }
        }
        getClothingEdit()
    },[])
    const handleClickCLoset=()=>{
        setModalEdit(false)
        setNombre("")
        setDescripcion("")
        setTalla("")
        setPrecio("")
        setTypeClothing(undefined)
    }
    const handleSubmitEdit =(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if([nombre,talla,descripcion,precio,typeClothing].includes("")){
            setAlert({ 
                errorState: true, 
                msg: "Los campos son obligatorios"
            })
            setTimeout(() => {
                setAlert({ errorState: false, msg: "" });
            }, 3000)
            return 
        }
        if(listClothing && editClothingSubmit && typeClothing){
            const objEdit:ClothingInterface ={
                _id:idClothing,
                nombre,
                talla,
                descripcion,
                precio:Number(precio),
                typeBody:typeClothing
            } 
           
            editClothingSubmit(objEdit)
            setModalEdit(false)
        }
    }
  return (
    <div 
        className="fixed bottom-0 top-0 right-0 left-0 bg-gray-100 bg-opacity-50
        flex items-center justify-center"
    >
        <div className=" w-2/5 rounded-lg bg-gray-100 shadow-2xl space-y-2">
            <button className=" p-4 flex justify-end w-full " onClick={handleClickCLoset}>
                <span className="p-1 rounded-full bg-red-500 hover:bg-red-600"><IoIosClose /></span>
            </button>
            {alert.msg.length ?<MessageAlert alert={alert}/>:null}
            <form className="  px-8 space-y-4  py-2" onSubmit={handleSubmitEdit}>
                <div className="flex flex-col  ">
                    <label 
                        htmlFor="nameClothing" 
                        className="text-lg"
                    >Nombre de la prenda</label>
                    <input 
                        type="text" 
                        id="nameClothing"
                        className="border-b border-black h-6 pl-2 bg-transparent"
                        value={nombre}
                        onChange={e=>setNombre(e.target.value)}
                    />
                </div>
                <div className="flex flex-col  ">
                    <label 
                        htmlFor="nameClothing" 
                        className="text-lg"
                    >Descripción de la prenda</label>
                    <input 
                        type="text" 
                        id="nameClothing"
                        className="border-b border-black h-6 pl-2 bg-transparent"
                        value={descripcion}
                        onChange={e=>setDescripcion(e.target.value)} 
                    />
                </div>
                <div className="flex flex-col ">
                    <label 
                        htmlFor="nameClothing" 
                        className="text-lg"
                    >Talla</label>
                    <input 
                        type="text" 
                        id="nameClothing"
                        className="border-b border-black h-6 pl-2 bg-transparent"
                        value={talla}
                        onChange={e=>setTalla(e.target.value)}
                    />
                </div>
                <div className="flex flex-col  ">
                    <label 
                        htmlFor="nameClothing" 
                        className="text-lg"
                    >Precio</label>
                    <input 
                        type="text" 
                        id="nameClothing"
                        className="border-b border-black h-6 pl-2 bg-transparent"
                        value={precio}
                        onChange={e=>setPrecio(e.target.value)}
                    />
                </div>
                <div className="flex flex-col ">
                    <label 
                        htmlFor="typeBody" 
                        className="text-lg mb-2"
                    >Tipo de prenda</label>
                    <select id="typeBody " value={typeClothing} onChange={e=>setTypeClothing(e.target.value as objTypeBopdy)}>
                        <option value=""  disabled>Opciones...</option>
                        <option value="full">Cuerpo entero</option>
                        <option value="body">Torso</option>
                        <option value="lower">Inferior</option>
                    </select>
                </div>
                <input 
                    type="submit" 
                    value="Guardar cambios" 
                    className="text-lg text-center p-2 rounded-md 
                    bg-purple-600 transition-colors w-full text-white cursor-pointer hover:bg-purple-700 mt-4"
                />
            </form>
        </div>
    </div>
  )
}

export default FormEdit