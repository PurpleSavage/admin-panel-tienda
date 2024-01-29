import { useState,FormEvent } from "react"
import MessageAlert from "./MessageAlert"
import { ErrorMessageInterface } from "../interfaces/interfaceObj"
import useClothing from "../hooks/useClothing"
import  { ClothingInterface } from "../interfaces/interfacesClothing"
import { objTypeBopdy } from "../interfaces/interfacesClothing"
//import { uploadFile } from "../firebase/config"
const FormClothing = () => {
    const[alert,setAlert]=useState<ErrorMessageInterface>({
        errorState: false,
        msg: ""
      })
    const[nombre,setNombre]=useState("")
    const [descripcion,setDescripcion]=useState("")
    const [talla,setTalla]=useState("")
    const [precio,setPrecio]=useState("")
    const [typeClothing,setTypeClothing]=useState<objTypeBopdy >()
    const [firstImg,setFirstImg]=useState<File | null>(null)
    const [secondImg,setSecondImg]=useState<File | null>(null)

    const {handleSendClothingCreate} =useClothing() || {handleSendClothingCreate:()=>{}} 


    const handleFirstImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Accede al primer archivo si existe
      
        if (file !== undefined) { 
            setFirstImg(file);
        }
      };
      
    const handleSecondImgChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Accede al primer archivo si existe
        if (file!==undefined) {
            setSecondImg(file);
        }
    };
    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        if([nombre,descripcion,talla,precio,typeClothing].includes("")){
            setAlert({ 
                errorState: true, 
                msg: "Los campos son obligatorios"
            })
            setTimeout(() => {
                setAlert({ errorState: false, msg: "" });
            }, 3000)
            return
        }
        let precioInt= parseInt(precio)
        let precioFloat=parseFloat(precio)
        if(isNaN(precioInt) &&isNaN(precioFloat) ){
            setAlert({ 
                errorState: true, 
                msg: "El valor del precio es incorrecto"
            })
            setTimeout(() => {
                setAlert({ errorState: false, msg: "" });
            }, 3000)
            return
        }
        if(firstImg ===null || secondImg===null){ 
            setAlert({ 
                errorState: true, 
                msg: "Los campos son obligatorios"
            })
            setTimeout(() => {
                setAlert({ errorState: false, msg: "" });
              }, 3000)
            return
        }
            const formData = new FormData()
            formData.append("firstImg", firstImg);
            formData.append("secondImg", secondImg);
            const clothingData: ClothingInterface= {
                nombre,
                descripcion,
                talla,
                precio: Number(precio),  
                typeBody: typeClothing!,
            }
            
        await handleSendClothingCreate(clothingData,formData)
        setNombre("")
        setDescripcion("")
        setTalla("")
        setPrecio("")
    }
  return (
    <>
        {alert.msg.length ?<MessageAlert alert={alert}/>:null}
        <form className="my-4 shadow-2xl px-8 py-5 rounded-md bg-white  space-y-4  w-1/2" onSubmit={handleSubmit} >
            <div className="flex flex-col">
                <label 
                    htmlFor="nameClothing" 
                    className="text-lg"
                >Nombre de la prenda</label>
                <input 
                    type="text" 
                    id="nameClothing"
                    className="border-b border-black h-6 pl-2 "
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
            <label 
                htmlFor="descripcion" 
                className="text-lg"
            >Descripción de la prenda</label>
            <textarea
                id="descripcion"
                className="border h-26 border-black pl-2 pt-2" 
                value={descripcion}
                onChange={e=>setDescripcion(e.target.value)} 
            />
            </div>
            <div className="flex flex-col">
                <label 
                    htmlFor="size" 
                    className="text-lg "
                >Talla</label>
                <input 
                    type="text" 
                    id="size"
                    className="border-b border-black h-6 pl-2 " 
                    value={talla}
                    onChange={e=>setTalla(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label 
                    htmlFor="price" 
                    className="text-lg "
                >Precio</label>
                <input 
                    type="text" 
                    id="price"
                    className="border-b border-black h-6 pl-2 " 
                    value={precio}
                    onChange={e=>setPrecio(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label 
                    htmlFor="typeBody" 
                    className="text-lg mb-2"
                >Tipo de prenda</label>
                <select id="typeBody " value={typeClothing} onChange={e=>setTypeClothing(e.target.value as objTypeBopdy)}>
                    <option value="" >Opciones...</option>
                    <option value="full">Cuerpo entero</option>
                    <option value="body">Torso</option>
                    <option value="lower">Inferior</option>
                </select>
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="firstImg">Vista frontal</label>
                <input 
                    type="file" 
                    id="firstImg" 
                    name="imageFront" 
                    accept="image/*"
                    onChange={handleFirstImgChange}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="secondImg">Vista trasera</label>
                <input 
                    type="file" 
                    id="secondImg" 
                    name="imageBack" 
                    accept="image/*"
                    onChange={handleSecondImgChange}
                />
            </div>
            <input 
            type="submit" 
            value="Agregar" 
            className="text-lg text-center p-2 rounded-md 
            bg-purple-600 transition-colors w-full text-white cursor-pointer hover:bg-purple-700 mt-4"
            />
    </form>
    </>
  )
  
}

export default FormClothing