import { CiCircleCheck } from "react-icons/ci";
import useClothing from "../hooks/useClothing";
const Success = () => {
  const {setSuccessModal,msg}=useClothing() || {}
  return (
    <div 
        className="fixed bg-slate-100 bg-opacity-50 flex bottom-0 right-0 left-0 top-0
        items-center justify-center"
    >
        <section className="shadow-2xl bg-white rounded-lg p-5 w-[350px] ">
           <div className="flex items-center gap-2">
            <span className="text-green-600"><CiCircleCheck size={60} /></span> 
            <p>{msg}</p>
           </div>
           <div className="flex justify-end">
            <button 
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={()=>setSuccessModal(false)}
            >Aceptar</button>
           </div>
        </section>
    </div>
  )
}

export default Success