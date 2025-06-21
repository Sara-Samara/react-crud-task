import Navbar from './component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Create from './page/create/Create'
import Details from './page/details/Details'
import Home from './page/Home/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from './page/edit/Edit'

export default function App() {
  return (
    <>

      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Details/:userId" element={<Details />} />
        <Route path="/Edit/:userId" element={<Edit />} />
      </Routes>
      <ToastContainer />


    </>
  )
}

