import React, { useState } from 'react';
import axios from 'axios';

export const Uploadimg = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
      

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("SUccesfully submit......")
            console.log('Uploaded:', res.data);
        } catch (err) {
            console.error('Upload error:', err.message);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

