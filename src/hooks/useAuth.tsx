import { useContext } from "react"
import AuthContext from "../context/AuthProvider"
const useAuth = () => { 
    const context =useContext(AuthContext)
    if(context === undefined || context ===null){
        throw new Error ("useThemeContext muse be used within a ThemeContextProvider")
    }
    return context
}

export default useAuth