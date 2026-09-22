import {Routes, Route} from 'react-router-dom'
import ButtonPage from './pages/ButtonPage'
import AccordionPage from './pages/AccordianPage'
import DropdownPage from './pages/DropdownPage'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <div> 
        <NavBar/>
      </div>
      <div className="col-span-5">
      <Routes>
        <Route path="/" element={<ButtonPage/>}/>
        <Route path="/accordion" element={<AccordionPage/>}/>
        <Route path="/dropdown" element={<DropdownPage/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App
