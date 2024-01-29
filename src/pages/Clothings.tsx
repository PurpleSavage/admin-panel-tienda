import { RiTShirtFill } from "react-icons/ri";
import { GiLargeDress } from "react-icons/gi";
import { GiSkirt } from "react-icons/gi";
import useClothing from "../hooks/useClothing";
import CardListClothing from "../components/CardListClothing";
import FormEdit from "../components/FormEdit";
import Spinner from "../components/Spinner";
import Success from "../components/Success";
import { useState } from "react";

const Clothings = () => {
  const{listClothing,modalEdit,loader,successModal}=useClothing() || {listClothing:[]}
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredClothing = listClothing.filter(element => 
    element.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <>
      {modalEdit && <FormEdit/>}
      {loader && <Spinner/>}
      {successModal && <Success/>}
      <div className=" flex justify-around">
        <div className=" bg-slate-100 shadow-xl rounded-md p-4">
          <p className="flex gap-3 items-center text-lg font-semibold">Fullbody<GiLargeDress /></p>
          <p className="text-md font-semibold text-gray-600">cantidad: {listClothing.filter(element=>element.typeBody==="full").length}</p>
        </div>
        <div className="bg-slate-100 shadow-xl rounded-md p-4">
          <p className="flex gap-3 items-center text-lg font-semibold">Upper <RiTShirtFill /></p>
          <p className="text-md font-semibold text-gray-600">cantidad: {listClothing.filter(element=>element.typeBody==="body").length}</p>
        </div>
        <div className="bg-slate-100 shadow-xl rounded-md p-4">
          <p className="flex gap-3 items-center text-lg font-semibold">Lower <GiSkirt /></p>
          <p className="text-md font-semibold text-gray-600">cantidad: {listClothing.filter(element=>element.typeBody==="lower").length}</p>
        </div>
      </div>
      <section className="mt-6 bg-slate-100 shadow-2xl rounded-md">
        <form className="flex  justify-center items-center p-2 gap-4">
          <input type="text" placeholder="Buscar ropa" className="h-8 w-1/3 px-2" onChange={handleSearchChange}/>
          <button type="submit" className=" p-1 px-4 bg-purple-700 rounded-md text-white">Buscar</button>
        </form>
        <div className="space-y-2 px-4 max-h-[400px] overflow-y-auto py-4">
          {
            filteredClothing.length? 
            filteredClothing.map((element)=>(
              <CardListClothing
                element={element}
                key={element._id}
              />
            ))
            :<p className="text-center font-semibold">No agregaste ropa</p>
          }
        </div>
      </section>
    </>
  )
}

export default Clothings