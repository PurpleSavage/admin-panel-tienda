import { BrowserRouter,Route,Routes } from "react-router-dom"
import Auth from "./layouts/Auth"
import RutaProtegida from "./layouts/RutaProtegida"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { AuthProvider } from "./context/AuthProvider"
import Clothings from "./pages/Clothings"
import CreateClothing from "./pages/CreateClothing"
import { ClothingProvider } from "./context/ClothingProvider"
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ClothingProvider>
          <Routes>
            <Route path="/" element={<Auth/>}>
              <Route index element={<Login/>}/>
            </Route>
            <Route path="/panel" element={<RutaProtegida/>}>
              <Route index element={<Clothings/>}/>
              <Route path="agregar" element={<CreateClothing/>}/>
              <Route path="register" element={<Register/>}/>
            </Route>
          </Routes>
        </ClothingProvider>
      </AuthProvider>
    </BrowserRouter>  
  )
}

export default App
