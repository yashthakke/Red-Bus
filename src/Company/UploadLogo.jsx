    import React, { useState } from 'react';
    import '../assets/UploadLogo.css';
    import axios from 'axios';

    export const UploadLogo = () => {
      const [file, setFile] = useState(null);

      const uploadFile = async () => {
        if (!file) return alert('Please select a file.');

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('file', file);

        try {
          const res = await axios.post("http://127.0.0.1:3000/upload", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });

          alert("Upload successful!");
          console.log("Response:", res.data);
          localStorage.setItem("logoUploaded", "true");
           window.location.reload();
        } catch (error) {
          console.error("Upload failed:", error.response?.data || error.message);
        }
      };

      return (
        <div className="upload-container">
          <h2>Upload Image</h2>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={uploadFile}>Upload</button>
        </div>
      );
    };
