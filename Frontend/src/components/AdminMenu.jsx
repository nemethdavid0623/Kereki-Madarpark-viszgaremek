import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminMenu = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            // 1. Kérés a Laravelnek (a token automatikusan megy a fejlécben)
            await axios.post('http://localhost:8000/api/logout');
            console.log("Szerver oldali token törölve.");
        } catch (error) {
            // Ha a token már lejárt vagy hálózati hiba van
            console.error("Szerver hiba a kijelentkezéskor:", error.response?.data);
        } finally {
            // 2. Mindenképpen kitakarítjuk a React állapotot
            logout(); 
            // 3. Visszük a felhasználót a Login oldalra
            navigate('/Login');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Admin Vezérlőpult</h1>
            <div style={styles.menuBox}>
                <button onClick={() => navigate('/AnimalInput')}>Állatok kezelése</button>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Biztonságos Kijelentkezés
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', textAlign: 'center' },
    menuBox: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px', margin: '0 auto' },
    logoutBtn: { backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '4px' }
};

export default AdminMenu;