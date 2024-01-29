import { ClothingInterface } from "../interfaces/interfacesClothing"
import useClothing from "../hooks/useClothing"
import DeleteModal from "./DeleteModal"
import { useState } from "react"

const CardListClothing = ({element}:{element:ClothingInterface}) => {
    const{nombre,descripcion,talla,precio,images,_id,typeBody} = element
    
    const {setModalEdit,setIdClothing,warning,setWarning}=useClothing() || {} 
    const [idComponent,setIdComponent]=useState("")
    const [nameFileFirst,setNameFileFirst]=useState("")
    const [nameFileSecond,setNameFileSecond]=useState("")
    const handleClick =()=>{
        setModalEdit(true)
        setIdClothing(_id)
    }
    const idUpdate=()=>{
        setWarning(true)
        if(_id && images){
            setIdComponent(_id)
           if(images[0].nameFile && images[1].nameFile ){
            setNameFileFirst(images[0].nameFile)
            setNameFileSecond(images[1].nameFile)
           }
        }
        
    }
  return (
    <>
    {warning && idComponent? 
        <DeleteModal 
            id={idComponent}
            nameFileFirst={nameFileFirst}
            nameFileSecond ={nameFileSecond}
        />
        :null
    }
        <div className="bg-slate-50 flex justify-between p-2 items-center">
            
            <div className="w-1/3 items-center justify-center">
                <h2>{nombre}</h2>
                <p>{descripcion}</p>
                <p className="text-purple-600 font-bold">type:{typeBody}</p>
                <p>
                    <span className="text-gray-500">talla: {talla}</span>{" "} 
                    <span className="text-gray-500">precio:</span><span className="text-green-700 font-semibold"> S/{precio}</span>
                </p>
            </div>
            <div className="flex items-center justify-center w-1/3">
                {
                    images &&  images.length ? images.map((element)=>(
                        <img src={element.url} alt="" key={element._id} className="h-16"/>
                    )) :"No hay imágenes para mostrar"
                }
            </div>
            <div className="flex gap-x-3 items-center w-1/3 justify-center">
                <button 
                    type="button" 
                    className="px-4 py-2 rounded-md  bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
                    onClick={handleClick}
                >Editar</button>
                <button 
                    type="button" 
                    className="px-4 py-2  rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                    onClick={idUpdate}
                >Eliminar</button>
            </div>
        </div>
    </>
  )
}

export default CardListClothing