import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Report.css";
import "../components/ImageUpload.css";

import jsPDF from "jspdf";

function Report() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reports, setReports] = useState([]); // ✅ NEW

  const token = localStorage.getItem("token");

  // ✅ FETCH USER + BOOKINGS + REPORTS
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) {
      fetchBookings();
      fetchReports();
    }
  }, [token]);

  // ✅ IMAGE SELECT
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  // ✅ PREDICT + SAVE
  const handleUpload = async () => {
    if (!file) return alert("Select image first");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      // STEP 1: ML MODEL
      const res = await fetch("https://varicose-veins-model.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const stage =
        data.result === "varicose_veins"
          ? Math.floor(Math.random() * 3) + 1
          : null;

      // STEP 2: SAVE TO BACKEND
      const saveData = new FormData();
      saveData.append("image", file);
      saveData.append("result", data.result);
      saveData.append("probability", data.probability);
      saveData.append("stage", stage);

      await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: saveData,
      });

      // STEP 3: UPDATE UI
      setResult({
        result: data.result,
        probability: data.probability,
        stage,
      });

    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const getBase64ImageFromURL = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  // ✅ PDF DOWNLOAD (USES STORED DATA 🔥)
  const downloadPDF = async () => {
    const pdf = new jsPDF();
    let y = 20;

    pdf.setFontSize(18);
    pdf.text("Varicose Veins Medical Report", 20, y);
    y += 10;

    pdf.setFontSize(12);
    pdf.text(`Date: ${new Date().toLocaleString()}`, 20, y);
    y += 10;

    // USER
    if (user) {
      pdf.text(`Patient: ${user.name}`, 20, y);
      y += 6;
      pdf.text(`Email: ${user.email}`, 20, y);
      y += 10;
    }

    // BOOKINGS
    if (bookings.length > 0) {
      pdf.setFontSize(14);
      pdf.text("Previous Consultations:", 20, y);
      y += 8;

      pdf.setFontSize(11);

      bookings.forEach((b) => {
        pdf.text(`Doctor: ${b.doctor}`, 20, y);
        y += 5;
        pdf.text(`Date: ${new Date(b.appointmentTime).toLocaleString()}`, 20, y);
        y += 5;
        pdf.text(`Status: ${b.status}`, 20, y);
        y += 8;
      });
    }

    // ✅ USE STORED REPORT
    if (reports.length > 0) {
      const latest = reports[0];

      pdf.setFontSize(14);
      pdf.text("Medical Result:", 20, y);
      y += 10;

      pdf.setFontSize(11);
      pdf.text(`Condition: ${latest.result}`, 20, y);
      y += 6;

      pdf.text(
        `Probability: ${(latest.probability * 100).toFixed(2)}%`,
        20,
        y
      );
      y += 8;

      // STAGE
      const stageValue = Number(latest.stage);
      if (stageValue) {
        pdf.text(`Stage: ${latest.stage}`, 20, y);
        y += 6;

        let stageText = "";

        if (stageValue === 1) {
          stageText = "Stage 1: Mild condition. Lifestyle changes recommended.";
        } else if (stageValue === 2) {
          stageText = "Stage 2: Moderate condition. Doctor consultation advised.";
        } else if (stageValue === 3) {
          stageText = "Stage 3: Severe condition. Immediate treatment required.";
        }

        const split = pdf.splitTextToSize(stageText, 170);
        pdf.text(split, 20, y);
        y += split.length * 6;
      }

      // IMAGE FROM BACKEND
      if (latest.image) {
        y += 10;
        pdf.text("Uploaded Image:", 20, y);
        y += 10;
        const imagePath = latest.image.replace(/\\/g, "/");
        const imageUrl = `http://localhost:5000/${imagePath}`;

        const base64Image = await getBase64ImageFromURL(imageUrl);

        const imgHeight = 100;

        pdf.addImage(base64Image, "JPEG", 20, y, 160, imgHeight);

        // 👉 MOVE Y BELOW IMAGE
        y += imgHeight + 10;
      }
    }

    // ✅ DISCLAIMER
    y += 5;

    pdf.setFontSize(10);

    const disclaimerText = `Please consult a qualified healthcare provider for proper evaluation and treatment.`;

    const splitDisclaimer = pdf.splitTextToSize(disclaimerText, 170);
    pdf.text(splitDisclaimer, 20, y);

    pdf.save("Medical_Report.pdf");
  };

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="page-content">

        {/* ✅ UPLOAD FOR NEW REVIEW */}
        <div className="upload-container">
          <h2>Upload for New Review</h2>

          <label className="upload-box">
            <span>Click to upload</span>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {preview && <img src={preview} alt="preview" className="preview" />}

          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Predicting..." : "Upload & Predict"}
          </button>

          {result && (
            <div className="result-section">
              <h3>Prediction Result</h3>
              <p>Condition: {result.result}</p>
              <p>Probability: {(result.probability * 100).toFixed(2)}%</p>
              {result.stage && <p>Stage: {result.stage}</p>}
            </div>
          )}
        </div>

        {/* ✅ SHOW DOWNLOAD ONLY IF USER HAS CONSULTED */}
        {user && bookings.length > 0 && (
          <div className="previous-booking-section">
            <h2>Previous Consultation</h2>
            <button className="download-btn-bottom" onClick={downloadPDF}>
              📄 Download Latest Report
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Report;