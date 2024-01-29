import FormClothing from "../components/FormClothing"
import Spinner from "../components/Spinner"
import useClothing from "../hooks/useClothing"
import Success from "../components/Success"

const CreateClothing = () => {
  const{loader,successModal}=useClothing() || {}
  return (
    <div className="mx-auto  flex flex-col items-center">
      {successModal && <Success/>}
      {loader && <Spinner/> }
      <FormClothing/>
    </div>
  )
}

export default CreateClothing