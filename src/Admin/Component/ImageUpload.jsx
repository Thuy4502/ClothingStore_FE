import React, { useState } from 'react';
import { uploadImageToFirebase } from '../../firebase'; // Import the function

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = await uploadImageToFirebase(file); // Link to Firebase
      localStorage.setItem('imageUrl', url);
      console.log('Image URL saved to localStorage:', url);
      alert('Image uploaded and URL saved successfully!');
    } catch (uploadError) {
      console.error('Error uploading image:', uploadError);
      setError('Error uploading image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div style={{ width: '300px', height: '300px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {preview ? (
          <img src={preview} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <img src="/path/to/default-image.jpg" alt="Default" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        )}
      </div>
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
