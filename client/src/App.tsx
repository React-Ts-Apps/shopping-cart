import { BrowserRouter, Route, Routes } from "react-router-dom"
import ItemList from "./components/user/ItemList"
import AdminDashBoard from "./components/admin/AdminDashBoard"
import ActionPage from "./components/user/ActionPage"
import Layout from "./components/ui/LayOut"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<ItemList />} />
          <Route path='/home' element={<ItemList />} />
          <Route path='/:action' element={<ActionPage />} />
          <Route path='/:admin/items' element={<AdminDashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
