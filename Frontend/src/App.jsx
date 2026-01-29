import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import AnimalManager from './components/AnimalManager';
import AnimalsPage from './pages/AnimalsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/AnimalInput" element={<AnimalManager/>}/>
        <Route path="/Animals" element={<AnimalsPage/>}/>
      </Routes>
    </Router> 
  )
}

export default App;