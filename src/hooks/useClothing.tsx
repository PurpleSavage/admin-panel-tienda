import { useContext } from "react";
import ClothingContext from "../context/ClothingProvider";
const useClothing = () => {
  const context =useContext(ClothingContext)
  if(context === undefined || context ===null){
    throw new Error ("useThemeContext muse be used within a ThemeContextProvider")
  }
  return context
}

export default useClothing