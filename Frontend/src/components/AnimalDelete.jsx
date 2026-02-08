import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'; // 1. Navigáció importálása

const AnimalDelete = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate(); // 2. Navigáció inicializálása

    const fetchAnimals = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/AllData');
            setAnimals(response.data);
        } catch (error) {
            console.error("Hiba az adatok lekérésekor:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törölni szeretnéd ezt az állatot és az összes hozzá tartozó képet?")) {
            try {
                await axios.delete(`http://localhost:8000/api/DeleteAnimal/${id}`);
                setAnimals(prev => prev.filter(animal => animal.ID !== id && animal.id !== id));
                alert("Sikeres törlés!");
            } catch (error) {
                console.error("Törlési hiba:", error);
                alert("Hiba történt a törlés során.");
            }
        }
    };

    if (loading) return <div style={styles.loader}>Adatok betöltése...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Állatállomány Kezelése</h2>
            
            <table style={styles.table}>
                <thead>
                    <tr style={styles.thRow}>
                        <th>Kép</th>
                        <th>Fajnév</th>
                        <th>Típus</th>
                        <th>Készlet</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal) => (
                        <tr key={animal.id || animal.ID} style={styles.tr}>
                            <td style={styles.td}>
                                {animal.images && animal.images.length > 0 ? (
                                    <img 
                                        src={`http://localhost:8000/storage/uploads/${animal.images[0].ImageData}`} 
                                        alt="preview" 
                                        style={styles.previewImg} 
                                    />
                                ) : (
                                    <div style={styles.noImg}>Nincs kép</div>
                                )}
                            </td>
                            <td style={styles.td}><strong>{animal.SpeciesName}</strong></td>
                            <td style={styles.td}>{animal.SpeciesID === 1 ? 'Madár' : 'Egyéb'}</td>
                            <td style={styles.td}>{animal.Quantity} db</td>
                            <td style={styles.td}>
                                {/* 3. SZERKESZTÉS GOMB HOZZÁADÁSA */}
                                <button 
                                    onClick={() => navigate('/AnimalInput', { state: { editAnimal: animal } })} 
                                    style={styles.editBtn}
                                >
                                    Szerkesztés
                                </button>

                                <button 
                                    onClick={() => handleDelete(animal.id || animal.ID)} 
                                    style={styles.deleteBtn}
                                >
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {animals.length === 0 && <p style={{textAlign: 'center', marginTop: '20px'}}>Nincs megjeleníthető adat.</p>}
        </div>
    );
};

const styles = {
    container: { maxWidth: '900px', margin: '30px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' },
    title: { textAlign: 'center', color: '#333', marginBottom: '20px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    thRow: { backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', textAlign: 'left' },
    tr: { borderBottom: '1px solid #eee' },
    td: { padding: '12px', verticalAlign: 'middle', color: '#333' },
    previewImg: { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px', border: '1px solid #ddd' },
    noImg: { width: '60px', height: '60px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999', borderRadius: '5px' },
    // 4. ÚJ STÍLUS A SZERKESZTÉS GOMBHOZ
    editBtn: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' },
    deleteBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
    loader: { textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#666' }
};

export default AnimalDelete;