import React, { useState } from "react";
import "./ImageUpload.css";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null); // reset previous result
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await fetch("https://varicose-veins-model.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await res.json();
      console.log("API Response:", data);

      // Your Flask API returns probability + result
      setResult({
        result: data.result,
        probability: data.probability,
      });

    } catch (err) {
      console.error("Upload error:", err);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Affected Area Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />

      {preview && (
        <div className="preview-section">
          <p className="preview-label">Preview:</p>
          <img src={preview} alt="Preview" className="preview" />
        </div>
      )}

      <button onClick={handleUpload} className="upload-btn">
        {loading ? "Predicting..." : "Upload & Predict"}
      </button>

      {result && (
        <div className="result-section">
          <h3>Prediction Result:</h3>
          <p>
            <strong>Condition:</strong> {result.result}
          </p>
          <p>
            <strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
