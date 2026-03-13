import React from "react";
import Sidebar from "../components/Sidebar"; 
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to <span>Varicose Care</span></h1>
            <p>
              Your trusted companion in understanding, preventing, and managing
              varicose veins effectively.
            </p>
            <Link to="/report">
              <button className="hero-btn">Get Started</button>
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://plus.unsplash.com/premium_photo-1666299237067-5054e72e4776?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhlYWx0aGNhcmV8ZW58MHx8MHx8fDA%3D"
              alt="Varicose Care"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>What We Provide</h2>
          <div className="feature-cards">
            <div className="card">
              <h3>📊 Report</h3>
              <p>Track your vein health with easy-to-understand reports.</p>
            </div>
            <div className="card">
              <h3>💬 Teleconsultation</h3>
              <p>Consult doctors from the comfort of your home.</p>
            </div>
            <div className="card">
              <h3>🛡️ Precautions</h3>
              <p>Learn simple steps to prevent worsening of varicose veins.</p>
            </div>
            <div className="card">
              <h3>💡 Awareness</h3>
              <p>Stay informed with reliable knowledge and resources.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta">
          <h2>Take the First Step Toward Better Vein Health</h2>
          <Link to="/tele">
            <button className="cta-btn">Book a Consultation</button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
