import './App.css'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Products from './component/Products/Products'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Brands from './component/Brands/Brands'
import Carts from './component/Carts/Carts'
import Notfound from './component/Notfound/Notfound'
import UserContextProvider from './context/userContext'
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './component/ProductDetails/ProductDetails'
import CartContextProvider from './context/cartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './component/Checkout/Checkout'
import Allorders from './component/Allorders/Allorders'



function App() {

let routers = createBrowserRouter([
  {path:'' , element:<Layout/> , children:[
    {index:true , element: <ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'brands' , element: <ProtectedRoutes><Brands/></ProtectedRoutes>},
    {path:'productDetails/:id' , element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
    {path:'carts' , element: <ProtectedRoutes><Carts/></ProtectedRoutes>},
    {path:'checkout/:cartId' , element: <ProtectedRoutes><Checkout/></ProtectedRoutes>},
    {path:'allorders' , element:<ProtectedRoutes><Allorders/></ProtectedRoutes>},
    {path:'*' , element:<Notfound/>}
  ]}
  
])


  return (
    <>
     <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router = {routers}></RouterProvider>
          <Toaster />       
        </UserContextProvider>
     </CartContextProvider>


    </>
  )
}

export default App
