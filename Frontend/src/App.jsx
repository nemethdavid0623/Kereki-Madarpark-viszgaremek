import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/MainPage';
import AnimalManager from './components/AnimalManager';
import Animals from './components/Animals'; // Importáld be!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage/>}/>
          <Route path="/allataink" element={<Animals/>}/>
          <Route path="/AnimalInput" element={<AnimalManager/>}/>
        </Route>
      </Routes>
    </Router> 
  )
}

export default App;