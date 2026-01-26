import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './components/MainPage'
import MainPage from './components/MainPage';
import AnimalManager from './components/AnimalManager';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/AnimalInput" element={<AnimalManager/>}/>
      </Routes>
    </Router>     
       
  )
}

export default App