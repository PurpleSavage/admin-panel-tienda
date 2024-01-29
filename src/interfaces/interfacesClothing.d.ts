export interface ClothingProviderContextProps{
    listClothing:ClothingInterface[],
    handleSendClothingCreate:(clothing:ClothingInterface,formData:FormData)=>Promise<void>,
    modalEdit:boolean,
    setModalEdit: Dispatch<SetStateAction<boolean>>,
    idClothing:string,
    setIdClothing:Dispatch<SetStateAction<string>>,
    editClothingSubmit :(clothing:ClothingInterface)=>void,
    loader:boolean,
    setLoader:Dispatch<SetStateAction<boolean>>,
    successModal:boolean,
    setSuccessModal:Dispatch<SetStateAction<boolean>>,
    handleSubmitDeleteModal:(id:string,nameFileFirst:string,nameFileSecond:string)=>void,
    warning:boolean,
    setWarning:Dispatch<SetStateAction<boolean>>,
    msg:string,
    logOutClothings:()=>void,
   
}
export interface ClothingProviderProps {
    children: ReactNode;
}
export type imageObj={
    _id?:string,
    url: string,
    vew:string,
    nameFile?:string
}
export type objTypeBopdy="full"|"body"|"lower"
export interface ClothingInterface{
    nombre:string,
    descripcion:string,
    talla: string,
    precio: number,
    images?:imageObj[],
    typeBody:objTypeBopdy,
    _id?:string
}
