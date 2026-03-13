import React from 'react';
import Sidebar from '../components/Sidebar';
import './Treatment.css';

const treatments = [
  {
    title: "Laser Treatment",
    icon: "https://cdn-icons-png.flaticon.com/128/2910/2910760.png",
    description: "Minimally invasive procedure using light energy to close off varicose veins. Quick recovery in outpatient setting.",
  },
  {
    title: "Sclerotherapy",
    icon: "https://cdn-icons-png.flaticon.com/128/2910/2910761.png",
    description: "Chemical solution injected into the vein, causing it to collapse and fade. Best for smaller varicose or spider veins.",
  },
  {
    title: "Radiofrequency Ablation",
    icon: "https://cdn-icons-png.flaticon.com/128/2910/2910763.png",
    description: "Uses heat from radio waves to close affected veins. Minimally invasive and done under local anesthesia.",
  },
  {
    title: "Vein Stripping Surgery",
    icon: "https://cdn-icons-png.flaticon.com/128/2910/2910764.png",
    description: "Surgical removal of larger varicose veins. Used in severe or recurrent cases.",
  },
];

const postCare = [
  { icon: "https://cdn-icons-png.flaticon.com/128/929/929610.png", text: "Wear compression stockings as prescribed" },
  { icon: "https://cdn-icons-png.flaticon.com/128/929/929597.png", text: "Avoid standing for long durations" },
  { icon: "https://cdn-icons-png.flaticon.com/128/929/929565.png", text: "Keep treated area clean and dry" },
  { icon: "https://cdn-icons-png.flaticon.com/128/929/929607.png", text: "Follow up with your doctor regularly" },
];

const Treatment = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="treatment-container">
        <h1>Treatment Options for Varicose Veins</h1>

        <div className="treatment-grid">
          {treatments.map((treat, index) => (
            <div className="treatment-card" key={index}>
              <div className="icon-circle">
                <img src={treat.icon} alt={treat.title} />
              </div>
              <h2>{treat.title}</h2>
              <p>{treat.description}</p>
            </div>
          ))}
        </div>

        <h2 className="post-care-title">📝 Post-Treatment Care</h2>
        <div className="post-care-grid">
          {postCare.map((care, index) => (
            <div className="care-card" key={index}>
              <div className="care-icon">
                <img src={care.icon} alt="care icon" />
              </div>
              <p>{care.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Treatment;
