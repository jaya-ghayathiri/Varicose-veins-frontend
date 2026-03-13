// src/pages/Conditions.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import './Conditions.css';
const conditionsData = [
  {
    title: "Mild Swelling & Discoloration",
    img: "https://imgs.search.brave.com/RfQySYl-ZmESKp1B85UbhAvKEfGMP6R8fC2dUlUjdPo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dmVpbmVudnkuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI0/LzA4L3dvbWFuX3dp/dGhfc3dvbGxlbl9m/ZWV0LTEuanBn", // realistic leg icon
    desc: "Early sign of varicose veins: slight swelling around ankles or bluish tint on skin."
  },
  {
    title: "Twisted, Enlarged Veins",
    img: "https://imgs.search.brave.com/UKUFbh0cqwqjXoDd7XA9oIsCSFDc4vmHcVFneUsar4A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Y2VudGVyZm9ydmVp/bi5jb20vYXNzZXRz/L2ltYWdlcy9fNTYx/eEFVVE9fZml0X2Nl/bnRlci1jZW50ZXJf/ODBfbm9uZS9WYXJp/Y29zZS12ZWlucy1p/bWFnZS5qcGc", // veins illustration
    desc: "Bulging, twisted, blue or dark purple veins, usually on legs and feet."
  },
  {
    title: "Venous Ulcers",
    img: "https://imgs.search.brave.com/K8DWM-nYO32TkrmHzE6WzLvPNL5xzMQ7aW-lD-0XnNU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ub3Z1/c3NwaW5lY2VudGVy/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMS8wOS92ZW5v/dXMtdWxjZXItYmxv/Z18xMjAweDgxMi00/MDB4MjcxLmpwZw", // wound icon
    desc: "Open sores near ankles caused by prolonged pressure and poor circulation."
  },
  {
    title: "Deep Vein Thrombosis (DVT)",
    img: "https://imgs.search.brave.com/DQ5SR7X0G_N7DjKyoZ2lsMPSU5G8N9P-GZoyWxfkoiE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMTQw/NzM5Nzk2L3N0b2Nr/LXBob3RvLXZhcmlj/b3NlLXZlaW5zLW9u/LWEtZmVtYWxlLXNl/bmlvci1sZWc ", // blood clot icon
    desc: "Serious condition where blood clots form in deeper veins; can be life-threatening."
  },
  {
    title: "Chronic Venous Insufficiency",
    img: "https://imgs.search.brave.com/sUCQPHi_AmNmZygBa4udeh_NcsXIdoXddLTfglWhKiQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubWVkaWNpbmVu/ZXQuY29tL2ltYWdl/cy9hcnRpY2xlL21h/aW5faW1hZ2UvdmVu/b3VzLWluc3VmZmlj/aWVuY3kuanBnP291/dHB1dC1xdWFsaXR5/PTc1", // circulation icon
    desc: "Long-term condition where veins fail to pump blood efficiently, causing swelling and heaviness."
  },
];


const Conditions = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="conditions-container">
        <h1>Varicose Vein Conditions</h1>
        <div className="condition-grid">
          {conditionsData.map((condition, index) => (
            <div className="condition-card" key={index}>
              <img src={condition.img} alt={condition.title} />
              <h2>{condition.icon} {condition.title}</h2>
              <p>{condition.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conditions;
