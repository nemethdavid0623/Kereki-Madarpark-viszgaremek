import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const AnimalManager = () => {
    const { token } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Szerkesztési adatok kinyerése a navigációs state-ből
    const editData = location.state?.editAnimal;
    const isEditMode = !!editData;

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Alapértelmezett állapot (minden mezőnél üres string, hogy elkerüljük a null hibát)
    const [animalData, setAnimalData] = useState({
        SpeciesName: '',
        Quantity: 0,
        ForSaleQuantity: 0,
        Origin: '',
        Description: '',
        More: '',
        SpeciesID: 1
    });

    const [selectedImages, setSelectedImages] = useState([]);

    // Szerkesztés esetén az adatok betöltése és a NULL értékek kigyomlálása
    useEffect(() => {
        if (editData) {
            setAnimalData({
                ...editData,
                SpeciesName: editData.SpeciesName || '',
                Description: editData.Description || '',
                More: editData.More || '',
                Origin: editData.Origin || '',
                // Biztosítjuk, hogy az ID-t is eltároljuk a state-ben
                ID: editData.ID || editData.id 
            });
        }
    }, [editData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimalData({ ...animalData, [name]: value });
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setSelectedImages(newFiles);
    };

    const removeImage = () => {
        setSelectedImages([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(isEditMode ? 'Módosítás folyamatban...' : 'Mentés folyamatban...');
        setErrors({});

        const formData = new FormData();
        // Mezök hozzáadása, null védelemmel
        formData.append('SpeciesName', animalData.SpeciesName || '');
        formData.append('Quantity', animalData.Quantity || 0);
        formData.append('ForSaleQuantity', animalData.ForSaleQuantity || 0);
        formData.append('Origin', animalData.Origin || '');
        formData.append('Description', animalData.Description || '');
        formData.append('More', animalData.More || '');
        formData.append('SpeciesID', animalData.SpeciesID || 1);

        if (selectedImages.length > 0) {
            formData.append('image', selectedImages[0]);
        }

        // FONTOS: FormData + Laravel Update esetén kell a _method
        if (isEditMode) {
            formData.append('_method', 'PUT');
        }

        try {
            const currentID = animalData.ID || animalData.id;
            const url = isEditMode 
                ? `http://localhost:8000/api/UpdateAnimal/${currentID}`
                : 'http://localhost:8000/api/NewAnimal';

            // Mindig .post-ot használunk FormData küldésekor
            const response = await axios.post(url, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
            
            setMessage(isEditMode ? 'Sikeres módosítás!' : 'Sikeres mentés!');
            
            // 2 másodperc után visszatérünk a listához (AnimalDelete útvonal)
            setTimeout(() => navigate('/AnimalDelete'), 2000);

        } catch (err) {
            console.error("Hiba válasz:", err.response?.data);
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
            setMessage(err.response?.data?.message || 'Hiba történt a művelet során!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.container}>
                <h2 style={styles.title}>{isEditMode ? 'Állat szerkesztése' : 'Új állat rögzítése'}</h2>
                {message && <div style={styles.alert}>{message}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.row}>
                        <div style={{flex: 2}}>
                            <label style={styles.label}>Fajnév:</label>
                            <input type="text" name="SpeciesName" value={animalData.SpeciesName || ''} onChange={handleInputChange} style={styles.input} required />
                            {errors.SpeciesName && <span style={styles.errorText}>{errors.SpeciesName[0]}</span>}
                        </div>
                        <div style={{flex: 1}}>
                            <label style={styles.label}>Típus:</label>
                            <select name="SpeciesID" value={animalData.SpeciesID || 1} onChange={handleInputChange} style={styles.input}>
                                <option value="1">Madár</option>
                                <option value="2">Egyéb</option>
                            </select>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div>
                            <label style={styles.label}>Összes db:</label>
                            <input type="number" name="Quantity" value={animalData.Quantity || 0} onChange={handleInputChange} style={styles.input} required />
                        </div>
                        <div>
                            <label style={styles.label}>Eladó db:</label>
                            <input type="number" name="ForSaleQuantity" value={animalData.ForSaleQuantity || 0} onChange={handleInputChange} style={styles.input} required />
                        </div>
                    </div>

                    <label style={styles.label}>Rövid leírás:</label>
                    <textarea 
                        name="Description" 
                        value={animalData.Description || ''} 
                        onChange={handleInputChange} 
                        style={{...styles.input, height: '80px'}} 
                        required 
                    />

                    <label style={styles.label}>További információk:</label>
                    <textarea 
                        name="More" 
                        value={animalData.More || ''} 
                        onChange={handleInputChange} 
                        style={{...styles.input, height: '80px'}} 
                        required 
                    />

                    <hr style={styles.hr} />

                    <label style={styles.label}>
                        {isEditMode ? 'Új kép feltöltése (elhagyható):' : 'Kép kiválasztása:'}
                    </label>
                    <input type="file" onChange={handleFileChange} accept="image/*" style={styles.fileInput} />

                    <div style={styles.imageList}>
                        {selectedImages.map((file, index) => (
                            <div key={index} style={styles.imageItem}>
                                <span style={styles.fileName}>{file.name}</span>
                                <button type="button" onClick={removeImage} style={styles.removeBtn}>Törlés</button>
                            </div>
                        ))}
                    </div>

                    <button type="submit" disabled={loading} style={styles.submitBtn}>
                        {loading ? 'Folyamatban...' : (isEditMode ? 'Módosítások Mentése' : 'Állat Mentése')}
                    </button>
                    
                    {isEditMode && (
                        <button type="button" onClick={() => navigate('/AnimalDelete')} style={styles.cancelBtn}>
                            Mégse
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

const styles = {
    pageBackground: { backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px' },
    container: { maxWidth: '700px', margin: '0 auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontFamily: 'Arial, sans-serif' },
    title: { textAlign: 'center', color: '#1a1a1a', marginBottom: '25px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333333', fontSize: '14px' },
    row: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
    input: { padding: '12px', borderRadius: '8px', border: '2px solid #ddd', width: '100%', boxSizing: 'border-box', color: '#000' },
    hr: { border: '0', borderTop: '2px solid #f0f0f0', margin: '20px 0' },
    fileInput: { padding: '10px', border: '2px dashed #3498db', borderRadius: '8px', cursor: 'pointer', width: '100%' },
    imageList: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' },
    imageItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #dee2e6' },
    fileName: { fontSize: '14px', color: '#444' },
    removeBtn: { background: 'none', border: 'none', color: '#e74c3c', fontWeight: 'bold', cursor: 'pointer' },
    submitBtn: { marginTop: '25px', padding: '15px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' },
    cancelBtn: { marginTop: '10px', padding: '10px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%' },
    alert: { padding: '15px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#d1ecf1', color: '#0c5460', textAlign: 'center', fontWeight: 'bold' },
    errorText: { color: '#e74c3c', fontSize: '12px' }
};

export default AnimalManager;