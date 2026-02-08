import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import AnimalManager from './components/AnimalManager';
import AnimalsPage from './pages/AnimalsPage';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoot';
import AdminMenu from './components/AdminMenu';
import { AuthProvider } from './components/AuthContext';
import AnimalDelete from './components/AnimalDelete';

function App() {
  return (

    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/AnimalInput" element={<AnimalManager/>}/>
        <Route path="/Animals" element={<AnimalsPage/>}/>
        <Route path="/Login" element={<Login/>}/>

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminMenu/>
            </ProtectedRoute>
          } 
        />
        <Route 
            path="/AnimalInput" 
            element={
              <ProtectedRoute>
                <AnimalManager/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/AnimalDelete" 
            element={
              <ProtectedRoute>
                <AnimalDelete/>
              </ProtectedRoute>
            } 
          />
      </Routes>
    </Router>
    </AuthProvider>
     
  )
}

export default App;