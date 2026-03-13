import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Report.css";
import "../components/ImageUpload.css";

function Report() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      setResult(null);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      setResult({
        result: data.result,
        probability: data.probability,
      });
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Prediction failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="page-content">
        <div className="upload-container">
          <h2>Upload Affected Area Image</h2>

          {/* Upload Box */}
          <label htmlFor="fileInput" className="upload-box">
            <span className="upload-text">Click to upload or drag & drop</span>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
          </label>

          {/* Preview */}
          {preview && (
            <div className="preview-section">
              <p className="preview-label">Preview:</p>
              <img src={preview} alt="Preview" className="preview" />
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleUpload}
            className="upload-btn"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Upload & Predict"}
          </button>

          {/* Result */}
          {result && (
            <div className="result-section">
              <h3>Prediction Result:</h3>
              <p>
                <strong>Condition:</strong> {result.result}
              </p>
              <p>
                <strong>Probability:</strong>{" "}
                {(result.probability * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Report;