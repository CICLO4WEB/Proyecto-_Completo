import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductosAdmin } from './components/pages/Admin/ProductosAdmin'
import { VentasAdmin } from './components/pages/Admin/VentasAdmin'
import { Login } from './components/pages/Auth/Login'
import { Register } from './components/pages/Auth/Register'
import { Productos } from './components/pages/Client/Productos'
import { Home } from './components/pages/Home'
import AppContext from './context/AppContext'
import { parseJwt } from './helpers/destructure-jwt'
import useShoppingCart from './hooks/useShoppingCart'

function App() {

  const initialState = useShoppingCart();
  const [isAuth, setIsAuth] = useState({is: false, rol: ""});

  useEffect( () => {
    if ( localStorage.getItem("lico-token") ) {
      const {rol}=parseJwt(localStorage.getItem("lico-token"));
      if ( rol ) {
        setIsAuth({
          is: true,
          rol: rol
        })
      }
      else{
        setIsAuth({
          is: false,
          rol: ""
        })
      }
    }
  }, [])

  return (
    <>
      <AppContext.Provider value={initialState}>


        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* AUTH */}
          {
            !isAuth.is &&
            <>
            <Route path='/auth/login' element={<Login setIsAuth={setIsAuth}/>} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/*' element={<Login setIsAuth={setIsAuth} />} />
            </>
          }
          {
            isAuth.is && isAuth.rol === "USER_ROLE" ?
            // USER
            <>
              <Route path='/user/productos' element={<Productos setIsAuth={setIsAuth} />} />
              <Route path='/*' element={<Login setIsAuth={setIsAuth} />} />
            </>
            :
            isAuth.is && isAuth.rol === "ADMIN_ROLE" ?
            // ADMIN
            <>
            <Route path='/admin/productos' element={<ProductosAdmin setIsAuth={setIsAuth} />} />
            <Route path='/admin/ventas' element={<VentasAdmin setIsAuth={setIsAuth} />} />
            <Route path='/*' element={<Login setIsAuth={setIsAuth} />} />
            </>
            : null
          }
        </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  )
}

export default App
