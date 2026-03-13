import React from 'react';
import Sidebar from '../components/Sidebar';
import './Precautions.css';

// You can replace these URLs with actual image paths or URLs
const precautionsData = [
  {
    title: "🪑 Avoid Prolonged Sitting or Standing",
    description: "Take breaks to walk or stretch. Long periods of inactivity can lead to blood pooling in your legs.",
    image: "https://img.icons8.com/color/96/000000/standing-man.png"
  },
  {
    title: "🧦 Wear Compression Stockings",
    description: "These help improve blood flow in your legs by applying gentle pressure, reducing swelling and discomfort.",
    image: "https://img.icons8.com/color/96/000000/socks.png"
  },
  {
    title: "⚖️ Maintain a Healthy Weight",
    description: "Extra weight puts more pressure on your veins. A balanced diet and regular exercise can reduce the risk.",
    image: "https://img.icons8.com/color/96/000000/weight.png"
  },
  {
    title: "🦵 Elevate Your Legs",
    description: "Whenever possible, raise your legs above the level of your heart to promote blood flow back to the heart.",
    image: "https://img.icons8.com/color/96/000000/leg.png"
  },
  {
    title: "🥦 Eat a High-Fiber, Low-Salt Diet",
    description: "Reduce salt intake to prevent water retention. Fiber helps prevent constipation which can aggravate veins.",
    image: "https://img.icons8.com/color/96/000000/vegetarian-food.png"
  },
  {
    title: "🏃 Stay Physically Active",
    description: "Engage in walking, cycling, or swimming to improve leg circulation and overall vascular health.",
    image: "https://img.icons8.com/color/96/000000/exercise.png"
  },
];

const Precautions = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="precautions-container">
        <h1>Precautions for Varicose Veins</h1>
        <div className="precaution-grid">
          {precautionsData.map((item, index) => (
            <div className="precaution-card" key={index}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Precautions;
