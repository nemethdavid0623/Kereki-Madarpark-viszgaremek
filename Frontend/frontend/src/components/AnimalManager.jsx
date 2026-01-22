import React, { useState } from 'react';
import axios from 'axios';

const AnimalManager = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        SpeciesName: '', 
        Quantity: '', 
        ForSaleQuantity: '0', // Alapérték
        Description: '', 
        SpeciesID: '1', 
        Habitat: '',
        Feeding: '', 
        OriginName: ''
    });

    const token = localStorage.getItem('token');
    // Alap URL definiálása a könnyebb íráshoz
    const API_BASE = "http://localhost:8000/api";

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!token) {
            alert("Nincs bejelentkezve! Kérem jelentkezzen be újra.");
            return;
        }

        setLoading(true);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            // 1. LÉPÉS: Származás mentése
            const originRes = await axios.post(`${API_BASE}/NewOrigin`, { Name: formData.OriginName }, config);
            // Itt a data.data.ID-t (vagy id-t) használd, ahogy a Laravel visszaküldi
            const originId = originRes.data.data.ID || originRes.data.data.id;

            // 2. LÉPÉS: Állat mentése
            const animalData = {
                ...formData,
                OriginID: originId
            };
            const animalRes = await axios.post(`${API_BASE}/NewAnimal`, animalData, config);
            const animalId = animalRes.data.data.ID || animalRes.data.data.id;

            // 3. LÉPÉS: Kép mentése
            if (file) {
                const imgData = new FormData();
                imgData.append('ImageFile', file);
                imgData.append('AnimalID', animalId);

                await axios.post(`${API_BASE}/NewImage`, imgData, {
                    headers: { 
                        ...config.headers,
                        'Content-Type': 'multipart/form-data' 
                    }
                });
            }

            alert("Minden sikeresen elmentve!");
            
            // Opcionális: Form kiürítése siker után
            setFormData({
                SpeciesName: '', Quantity: '', ForSaleQuantity: '0',
                Description: '', SpeciesID: '1', Habitat: '',
                Feeding: '', OriginName: ''
            });
            setFile(null);
            e.target.reset(); // Inputok vizuális ürítése

        } catch (error) {
            console.error("Hiba részletei:", error.response?.data);
            const errorMsg = error.response?.data?.message || "Szerver hiba történt";
            alert("Hiba: " + errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4" style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px'}}>
            <h2>Új állat hozzáadása</h2>
            
            <input type="text" placeholder="Állat fajneve" value={formData.SpeciesName} 
                onChange={e => setFormData({...formData, SpeciesName: e.target.value})} required />
            
            <select value={formData.SpeciesID} onChange={e => setFormData({...formData, SpeciesID: e.target.value})}>
                <option value="1">Madár</option>
                <option value="2">Emlős</option>
            </select>

            <input type="text" placeholder="Származási hely (pl. Afrika)" value={formData.OriginName} 
                onChange={e => setFormData({...formData, OriginName: e.target.value})} required />
            
            <input type="number" placeholder="Mennyiség" value={formData.Quantity} 
                onChange={e => setFormData({...formData, Quantity: e.target.value})} required />

            <input type="number" placeholder="Eladó mennyiség" value={formData.ForSaleQuantity} 
                onChange={e => setFormData({...formData, ForSaleQuantity: e.target.value})} required />
            
            <textarea placeholder="Leírás" value={formData.Description} 
                onChange={e => setFormData({...formData, Description: e.target.value})} required />
            
            <input type="text" placeholder="Élőhely" value={formData.Habitat} 
                onChange={e => setFormData({...formData, Habitat: e.target.value})} required />
            
            <input type="text" placeholder="Táplálkozás" value={formData.Feeding} 
                onChange={e => setFormData({...formData, Feeding: e.target.value})} required />

            <label>Fotó kiválasztása:</label>
            <input type="file" onChange={e => setFile(e.target.files[0])} required />

            <button type="submit" disabled={loading} style={{padding: '10px', cursor: 'pointer'}}>
                {loading ? "Mentés folyamatban..." : "Állat rögzítése"}
            </button>
        </form>
    );
};

export default AnimalManager;