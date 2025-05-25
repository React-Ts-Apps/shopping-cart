import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LayOut from "./components/ui/LayOut"
import ItemList from "./components/ItemList"
import AdminDashBoard from "./components/admin/AdminDashBoard"

function App() {
  return (
    <BrowserRouter>
      <LayOut />
      <Routes>
        <Route path='/' element={<Navigate to="/admin/items" />} />
        <Route path='/items' element={<ItemList />} />
        <Route path='/admin/items' element={<AdminDashBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
