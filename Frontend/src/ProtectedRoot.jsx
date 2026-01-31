import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // Ha nincs token, átirányítunk a loginra
        return <Navigate to="/Login" replace />;
    }

    return children;
};
export default ProtectedRoute;