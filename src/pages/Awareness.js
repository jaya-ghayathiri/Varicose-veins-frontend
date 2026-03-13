import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Awareness.css';

const faqsData = [
  { q: "What are varicose veins?", a: "Varicose veins are swollen, twisted veins that appear just under the skin, most commonly in the legs..." },
  { q: "What causes them?", a: "Common causes include prolonged standing or sitting, pregnancy, obesity, aging, hormonal changes..." },
  { q: "Can they be prevented?", a: "While not all varicose veins can be prevented, the risk can be reduced by maintaining a healthy weight..." },
  { q: "When should I see a doctor?", a: "Consult a doctor if you experience significant pain, swelling, skin discoloration..." },
];

const Awareness = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="awareness-container">
        <h1>Awareness Module</h1>

        {/* FAQs */}
        <div className="awareness-section">
          <h2>❓ FAQs</h2>
          <div className="faq">
            {faqsData.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${activeFAQ === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Awareness Videos */}
        <div className="awareness-section">
          <h2>🎬 Awareness Videos</h2>
          <div className="video-grid">
            <iframe
              src="https://www.youtube.com/embed/4ELaNAOmAsI"
              title="video1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <iframe
              src="https://www.youtube.com/embed/OgZEU-_JTqg"
              title="video2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>


        {/* Do's & Don'ts */}
        <div className="awareness-section">
          <h2>✅ Do’s & ❌ Don’ts</h2>
          <div className="dos-donts">
            <div className="dos-card">
              <h3>Do’s</h3>
              <ul>
                <li>Wear compression stockings</li>
                <li>Exercise regularly</li>
                <li>Elevate legs while resting</li>
              </ul>
            </div>
            <div className="donts-card">
              <h3>Don’ts</h3>
              <ul>
                <li>Avoid standing too long</li>
                <li>Don’t cross legs while sitting</li>
                <li>Avoid tight clothes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Signs */}
        <div className="awareness-section">
          <h2>⚠️ Emergency Signs</h2>
          <div className="emergency-grid">
            <div className="emergency-card">Sudden swelling in legs</div>
            <div className="emergency-card">Bleeding from varicose veins</div>
            <div className="emergency-card">Severe pain or redness</div>
            <div className="emergency-card">Signs of DVT like hard, warm veins</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awareness;
