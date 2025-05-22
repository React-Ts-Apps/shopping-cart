import { BrowserRouter, Route, Routes } from "react-router-dom"
import LayOut from "./components/LayOut"
import ItemList from "./components/ItemList"
import AdminDashBoard from "./components/admin/AdminDashBoard"

function App() {
  return (
    <BrowserRouter>
      <LayOut />
      <Routes>
        <Route path='/' element={<ItemList />} />
        <Route path='/items' element={<ItemList />} />
        <Route path='/admin/items' element={<AdminDashBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
