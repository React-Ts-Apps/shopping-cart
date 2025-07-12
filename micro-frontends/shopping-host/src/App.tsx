import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ProductList from "./components/product/ProductList"
import AdminDashBoard from "./components/admin/AdminDashBoard"
import ActionPage from "./components/user/ActionPage"
import LayOut from "./components/ui/LayOut"
import CartView from "./components/user/CartView"

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
          <Route path='/profile' element={<UserProfile />} > </Route>
          <Route path='/profile/update' element={<UpdateProfile />} />
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/home/cart' element={<CartView />} />
          <Route path='/recipes/*' element={

            <RecipeApp />

          } />
          <Route path='/:action' element={<ActionPage />} />
          <Route path='/:admin/items' element={<AdminDashBoard />} />

        </Route>
      </Routes>

    </Router>
  )
}

export default App
