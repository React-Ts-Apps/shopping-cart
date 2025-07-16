import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ProductList from "./components/product/ProductList"
import AdminDashBoard from "./components/admin/AdminDashBoard"
import LayOut from "./components/ui/LayOut"
import RecipeApp from "recipes-remote/RecipesApp"
import ProductDetails from "./components/product/ProductDetails"
import LoginForm from "./components/user/LoginForm"
import RegisterForm from "./components/user/RegisterForm"
import { useDispatch } from "react-redux"
import { useGetCurrentUserQuery } from "./services/authApi"
import { useEffect } from "react"
import { setCredentials } from "./redux/features/user/authSlice"
import UserProfile from "./components/user/UserProfile"
import UpdateProfile from "./components/user/UpdateProfile"
import ForgotPassword from "./components/user/ForgotPassword"
import ResetPassword from "./components/user/ResetPassword"
import UpdatePassword from "./components/user/UpdatePassword"
import Cart from "./components/cart/Cart"
import ShippingDetails from "./components/cart/ShippingDetails"
import ConfirmOrder from "./components/cart/ConfirmOrder"

import Payment from "./components/cart/Payment"
import OrderSuccess from "./components/order/OrderSuccess"
import UserOrders from "./components/order/UserOrders"
import OrderDetails from "./components/order/OrderDetails"


function App() {
  const dispatch = useDispatch()
  const { data } = useGetCurrentUserQuery()
  useEffect(() => {
    if (data?.success && data?.user) {
      dispatch(setCredentials(data.user))
    }

  })
  return (
    <Router>

      <Routes>
        <Route path='/' element={<LayOut />} >
          <Route index element={<ProductList />} />
          <Route path='/home' element={<ProductList />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/shipping' element={<ShippingDetails />} />
          <Route path='/confirm/order' element={<ConfirmOrder />} />
          <Route path='/my/orders' element={<UserOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path='/profile/update' element={<UpdateProfile />} />
          <Route path='/password/update' element={<UpdatePassword />} />
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/home/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/order/success' element={<OrderSuccess />} />
          <Route path='/recipes/*' element={

            <RecipeApp />

          } />
          <Route path='/:admin/items' element={<AdminDashBoard />} />

        </Route>
      </Routes>

    </Router>
  )
}

export default App
