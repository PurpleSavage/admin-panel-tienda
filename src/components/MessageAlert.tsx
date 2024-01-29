import { ErrorMessageInterface } from "../interfaces/interfaceObj"

const MessageAlert = ({alert}:{alert:ErrorMessageInterface}) => {
  const {errorState,msg}=alert
  return (
    <div 
        className={`p-2 rounded-md my-4 text-center font-semibold text-lg 
        ${errorState ? "bg-red-500 shadow-lg":"bg-purple-600"} text-white`}
    >{msg}</div>
  )
}

export default MessageAlert