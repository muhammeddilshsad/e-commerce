
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './Project/Signup'
import SignIn from './Project/SignIn'
import Home from './Page/Home'
import Navbar from './Page/Navbar'
import Shop from './Page/Shop'
import Cart from './Page/Cart'
import CartProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast'
import Orders from './Page/Orders'
import Payment from './Page/Payment'
import ProductModal from './Page/ProductModal'
import Sidebar from './Page/Sidebar'
import Viewuser from './Admine/Viewuser'
import Viewproduct from './Admine/Viewproduct'
import OverView from './Admine/OverView'
import Viewrevenew from './Admine/Viewrevenew'
import UserDetails from './Admine/UserDetails'
import UserProduct from './Admine/UserProduct'
import UserEdit from './Admine/UserEdit'
import AddProduct from './Admine/AddProduct'
import Wishlist from './Page/Wishlist'
import CheckoutSuccess from './Page/Ordersucces'











function App() {
  
  
  return (
    <>
    <CartProvider>
<Routes>

    <Route path='/'  element={<Home/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/navbar' element={<Navbar/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/cart'  element={<Cart/>}/>
    <Route path='/orders' element={<Orders/>}/>
    <Route path='/payment' element={<Payment/>}/>
    <Route path='/productmodel' element={<ProductModal/>}/>
    <Route path='/sidebar' element={<Sidebar/>}/>
    <Route path='/viewuser' element={<Viewuser/>}/>
    <Route path='/viewproduct' element={<Viewproduct/>} />
    <Route path='/overview' element={<OverView/>}/>
    <Route path='/viewrevenew' element={<Viewrevenew/>}/>
    <Route path="/userdetails/:userId" element={<UserDetails />}/>
    <Route path="/userproduct/:id" element={<UserProduct/>}/>
    <Route path="/useredit/:id" element={<UserEdit />} />
    <Route path='/addproduct' element={<AddProduct/>}/>
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path='/success/:sessionId' element={<CheckoutSuccess/>}/>
  

    


</Routes>
<Toaster/>
</CartProvider>
    </>
  )
}

export default App
