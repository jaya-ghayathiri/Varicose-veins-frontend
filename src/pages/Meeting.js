import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Meeting.css";

const Meeting = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();

  return (
    <div className="meeting-container">
      <h2 className="meeting-header">Live Consultation</h2>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <iframe
        src={`https://meet.jit.si/${roomName}`}
        allow="camera; microphone; fullscreen; display-capture"
        className="meeting-frame"
        title="Teleconsultation Meeting"
      ></iframe>
    </div>
  );
};

export default Meeting;
