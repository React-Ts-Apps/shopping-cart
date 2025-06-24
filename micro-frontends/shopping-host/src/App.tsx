import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ProductList from "./components/product/ProductList"
import AdminDashBoard from "./components/admin/AdminDashBoard"
import ActionPage from "./components/user/ActionPage"
import LayOut from "./components/ui/LayOut"
import CartView from "./components/user/CartView"

import RecipeApp from "recipes-remote/RecipesApp"


function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={<LayOut />} >
          <Route index element={<ProductList />} />
          <Route path='/home' element={<ProductList />} />
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
