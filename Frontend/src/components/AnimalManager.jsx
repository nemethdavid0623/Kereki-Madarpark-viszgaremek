import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AnimalManager = () => {
    const { token } = useAuth();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimalData({ ...animalData, [name]: value });
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setSelectedImages((prev) => [...prev, ...newFiles]);
    };

    const removeImage = (index) => {
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('Mentés folyamatban...');
        setErrors({});

        try {
            const animalRes = await axios.post('http://localhost:8000/api/NewAnimal', animalData);
            
            if (animalRes.data.success) {
                const newAnimalID = animalRes.data.data.id || animalRes.data.data.ID;

                if (selectedImages.length > 0) {
                    for (const file of selectedImages) {
                        const formData = new FormData();
                        formData.append('ImageFile', file);
                        formData.append('AnimalID', newAnimalID);

                        await axios.post('http://localhost:8000/api/NewImage', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });
                    }
                }

                setMessage('Sikeres mentés! Állat és képek rögzítve.');
                setAnimalData({ SpeciesName: '', Quantity: 0, ForSaleQuantity: 0, Origin: '', Description: '', More: '', SpeciesID: 1 });
                setSelectedImages([]);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
            setMessage('Hiba történt a mentés során!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.container}>
                <h2 style={styles.title}>Új állat rögzítése</h2>
                {message && <div style={styles.alert}>{message}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.row}>
                        <div style={{flex: 2}}>
                            <label style={styles.label}>Fajnév:</label>
                            <input type="text" name="SpeciesName" value={animalData.SpeciesName} onChange={handleInputChange} style={styles.input} required />
                        </div>
                        <div style={{flex: 1}}>
                            <label style={styles.label}>Típus:</label>
                            <select name="SpeciesID" value={animalData.SpeciesID} onChange={handleInputChange} style={styles.input}>
                                <option value="1">Madár</option>
                                <option value="2">Egyéb</option>
                            </select>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div>
                            <label style={styles.label}>Összes db:</label>
                            <input type="number" name="Quantity" value={animalData.Quantity} onChange={handleInputChange} style={styles.input} required />
                        </div>
                        <div>
                            <label style={styles.label}>Eladó db:</label>
                            <input type="number" name="ForSaleQuantity" value={animalData.ForSaleQuantity} onChange={handleInputChange} style={styles.input} required />
                        </div>
                        <div>
                            <label style={styles.label}>Származás:</label>
                            <input type="text" name="Origin" value={animalData.Origin} onChange={handleInputChange} style={styles.input} required />
                        </div>
                    </div>

                    <label style={styles.label}>Rövid leírás:</label>
                    <textarea name="Description" value={animalData.Description} onChange={handleInputChange} style={{...styles.input, height: '80px'}} required />

                    <label style={styles.label}>További információk:</label>
                    <textarea name="More" value={animalData.More} onChange={handleInputChange} style={{...styles.input, height: '80px'}} required />

                    <hr style={styles.hr} />

                    <label style={styles.label}>Képek kiválasztása:</label>
                    <input type="file" multiple onChange={handleFileChange} accept="image/*" style={styles.fileInput} />

                    <div style={styles.imageList}>
                        {selectedImages.map((file, index) => (
                            <div key={index} style={styles.imageItem}>
                                <span style={styles.fileName}>{file.name}</span>
                                <button type="button" onClick={() => removeImage(index)} style={styles.removeBtn}>Törlés</button>
                            </div>
                        ))}
                    </div>

                    <button type="submit" disabled={loading} style={styles.submitBtn}>
                        {loading ? 'Mentés...' : 'Állat Mentése'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    pageBackground: { backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px' },
    container: { maxWidth: '700px', margin: '0 auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' },
    title: { textAlign: 'center', color: '#1a1a1a', marginBottom: '25px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333333', fontSize: '14px' },
    row: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
    input: { padding: '12px', borderRadius: '8px', border: '2px solid #ddd', width: '100%', boxSizing: 'border-box', color: '#000', backgroundColor: '#fff' },
    hr: { border: '0', borderTop: '2px solid #f0f0f0', margin: '20px 0' },
    fileInput: { padding: '10px', border: '2px dashed #3498db', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#faffff', color: '#333' },
    imageList: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' },
    imageItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #dee2e6' },
    fileName: { fontSize: '14px', color: '#444' },
    removeBtn: { background: 'none', border: 'none', color: '#e74c3c', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' },
    submitBtn: { marginTop: '25px', padding: '15px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
    alert: { padding: '15px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#d1ecf1', color: '#0c5460', textAlign: 'center', fontWeight: 'bold' }
};

export default AnimalManager;