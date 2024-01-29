import { CiWarning } from "react-icons/ci"
import useClothing from "../hooks/useClothing"
import { IoIosClose } from "react-icons/io";
type DeleteModal = {
  id: string;
  nameFileFirst:string,
  nameFileSecond :string
}
const DeleteModal:React.FC<DeleteModal> = ({
    id,nameFileFirst,nameFileSecond
  }:
  {
    id:string,nameFileFirst:string,nameFileSecond:string
  }) => {
  const {handleSubmitDeleteModal,setWarning}=useClothing() || {} 
  const handleClickDelete =async()=>{
    if(handleSubmitDeleteModal){
        handleSubmitDeleteModal(id,nameFileFirst,nameFileSecond)
        setWarning(false)
    }
  }
  return (
    <div 
        className="fixed bottom-0 top-0 right-0 left-0 z-50 
        flex items-center justify-center"
    >
        <section className="shadow-2xl bg-white rounded-lg p-5 w-[350px] space-y-5 ">
          <div className="flex justify-end ">
            <button 
              className="rounded-full p-1 bg-gray-300 hover:bg-gray-400"
              onClick={()=>setWarning(false)}
            ><IoIosClose size={15} /></button>
          </div>
           <div className="flex items-center gap-2">
            <span className="text-red-600"><CiWarning size={60}/></span> 
            <p className="text-red-400">Se eliminará el elemento seleccionado</p>
           </div>
           <div className="flex justify-end">
            <button 
                className="bg-purple-600 text-white p-1 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={handleClickDelete}
            >Aceptar</button>
           </div>
        </section>
    </div>
  )
}

export default DeleteModal