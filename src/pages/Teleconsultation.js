// src/pages/Teleconsultation.js
import React, { useState, useEffect } from "react";
import "./Teleconsultation.css";
import Sidebar from "../components/Sidebar";
import emailjs from "emailjs-com";
import axios from "axios";

const Teleconsultation = () => {
  const [formData, setFormData] = useState({
    doctor: "",
    patient: "",
    patientEmail: "",
    phonenumber: "",
    age: "",
    appointmentTime: "",
  });

  const [bookings, setBookings] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [sending, setSending] = useState(false);

  

  // Doctors list
  const doctors = [
    {
      id: 1,
      name: "Dr. Ilakkiya",
      designation: "Vascular Surgeon",
      experience: 12,
      specialization: "Varicose Veins",
      hospital: "Apollo Hospitals",
      availability: "Mon-Fri, 10 AM - 4 PM",
      image: "https://randomuser.me/api/portraits/women/79.jpg",
      email: "ilakkiyasaravanan11@gmail.com",
    },
    {
      id: 2,
      name: "Dr. Jaya Ghayathiri",
      designation: "General Surgeon",
      experience: 8,
      specialization: "Minimally Invasive Surgery",
      hospital: "Fortis Healthcare",
      availability: "Tue-Thu, 11 AM - 3 PM",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      email: "jayaghayathiri@gmail.com",
    },
    {
      id: 3,
      name: "Dr. Madhu Sri",
      designation: "Interventional Radiologist",
      experience: 10,
      specialization: "Endovenous Laser Treatment",
      hospital: "Manipal Hospitals",
      availability: "Mon-Sat, 9 AM - 5 PM",
      image: "https://randomuser.me/api/portraits/women/40.jpg",
      email: "madhusri0774@gmail.com",
    },
  ];

  const generalConsultation = {
    id: 0,
    name: "Dr. Kamali",
    designation: "General Physician",
    experience: 5,
    specialization: "General Health Checkup",
    hospital: "Varicose Care Clinic",
    availability: "Mon-Sat, 9 AM - 6 PM",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    email: "kamalivm04@gmail.com",
  };

  // ENV for emailjs
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_PATIENT_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_PATIENT_ID;
  const TEMPLATE_DOCTOR_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_DOCTOR_ID;
  const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;

  const token = localStorage.getItem("token"); // JWT saved at login

  // Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    if (token) fetchBookings();
  }, [token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({ ...formData, doctor: doctor.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    if (
      !formData.patient ||
      !formData.patientEmail ||
      !formData.phonenumber ||
      !formData.age ||
      !formData.appointmentTime
    ) {
      alert("Please enter patient name, email, phone number, age, and appointment time.");
      return;
    }

    setSending(true);

    try {
      // 1️⃣ Create booking in backend
      const { data } = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          doctor: selectedDoctor.name,
          doctorEmail: selectedDoctor.email,
          patient: formData.patient,
          patientEmail: formData.patientEmail,
          phonenumber: formData.phonenumber,
          age: formData.age,
          appointmentTime: formData.appointmentTime,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newBooking = data.booking;

      // 2️⃣ Send emails using EmailJS
      const meetingUrl = `https://meet.jit.si/${newBooking.roomName}`;
      const appointmentTimeString = new Date(newBooking.appointmentTime).toLocaleString();

      const templateParamsPatient = {
        doctor_name: newBooking.doctor,
        patient_name: newBooking.patient,
        patient_age: newBooking.age,
        appointment_time: appointmentTimeString,
        meeting_url: meetingUrl,
        doctor_hospital: selectedDoctor.hospital,
        doctor_specialization: selectedDoctor.specialization,
        patient_phonenumber: newBooking.phonenumber,
        to_email: newBooking.patientEmail,
      };

      const templateParamsDoctor = {
        doctor_name: newBooking.doctor,
        patient_name: newBooking.patient,
        patient_age: newBooking.age,
        appointment_time: appointmentTimeString,
        meeting_url: meetingUrl,
        patient_email: newBooking.patientEmail,
        patient_phonenumber: newBooking.phonenumber,
        to_email: selectedDoctor.email,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_PATIENT_ID, templateParamsPatient, USER_ID);
      await emailjs.send(SERVICE_ID, TEMPLATE_DOCTOR_ID, templateParamsDoctor, USER_ID);

      alert("✅ Booking confirmed — emails sent to patient and doctor.");

      // 3️⃣ Refresh bookings list
      setBookings((prev) => [newBooking, ...prev]);

      // Reset form
      setFormData({
        doctor: "",
        patient: "",
        patientEmail: "",
        phonenumber: "",
        age: "",
        appointmentTime: "",
      });
      setSelectedDoctor(null);
    } catch (err) {
      console.error("Booking error:", err);
      alert("⚠️ Booking failed, check console for details.");
    } finally {
      setSending(false);
    }
  };

  const handleJoinMeeting = (booking) => {
    const now = new Date();
    const appointmentTime = new Date(booking.appointmentTime);
    if (now < appointmentTime) {
      alert("⏳ Meeting hasn't started yet. You can join at the scheduled time.");
      return;
    }
    const meetingUrl = `https://meet.jit.si/${booking.roomName}`;
    window.open(meetingUrl, "_blank");
  };

  return (
    <div className="teleconsultation-layout">
      <Sidebar />

      <div className="teleconsultation-content">
        <h1 className="page-title">Teleconsultation</h1>

        {/* General Consultation */}
        <h2 className="section-title">General Consultation</h2>
        <div className="card-grid">
          <div className="doctor-card general">
            <img src={generalConsultation.image} alt={generalConsultation.name} className="doctor-img" />
            <h3>{generalConsultation.name}</h3>
            <p className="designation">{generalConsultation.designation}</p>
            <p>🏥 {generalConsultation.hospital}</p>
            <p><strong>Experience:</strong> {generalConsultation.experience} yrs</p>
            <p><strong>Specialization:</strong> {generalConsultation.specialization}</p>
            <p><strong>Availability:</strong> {generalConsultation.availability}</p>
            <button className="btn" onClick={() => handleBookClick(generalConsultation)}>
              Book Appointment
            </button>
          </div>
        </div>

        {/* Specialized Doctors */}
        <h2 className="section-title">Specialized Doctors</h2>
        <div className="card-grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img src={doctor.image} alt={doctor.name} className="doctor-img" />
              <h3>{doctor.name}</h3>
              <p className="designation">{doctor.designation}</p>
              <p>🏥 {doctor.hospital}</p>
              <p><strong>Experience:</strong> {doctor.experience} yrs</p>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Availability:</strong> {doctor.availability}</p>
              <button className="btn" onClick={() => handleBookClick(doctor)}>
                Book Appointment
              </button>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedDoctor && (
          <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>📌 Book Appointment with {selectedDoctor.name}</h2>

              {selectedDoctor.id === 0 && (
                <p className="note">This booking is for a general consultation. You will meet a general physician.</p>
              )}

              <form onSubmit={handleSubmit} className="booking-form">
                <input type="text" name="patient" placeholder="Enter Patient Name" value={formData.patient} onChange={handleChange} required />
                <input type="email" name="patientEmail" placeholder="Patient Email (for confirmation)" value={formData.patientEmail} onChange={handleChange} required />
                <input type="text" name="phonenumber" placeholder="Phone Number" value={formData.phonenumber} onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required min="1" max="120" />
                <input type="datetime-local" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required />
                <div className="modal-buttons">
                  <button type="submit" className="btn confirm-btn" disabled={sending}>
                    {sending ? "Sending..." : "Confirm Booking"}
                  </button>
                  <button type="button" className="btn cancel-btn" onClick={() => setSelectedDoctor(null)} disabled={sending}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bookings */}
        <h2 className="section-title">Scheduled Meetings</h2>
        <div className="card-grid">
          {bookings.length === 0 ? (
            <p className="empty-text">No bookings yet.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <h3>{booking.doctor}</h3>
                <p>👤 {booking.patient}</p>
                <p>📧 {booking.patientEmail}</p>
                <p>📞 {booking.phonenumber}</p>
                <p>🎂 Age: {booking.age}</p>
                <p>🕒 {new Date(booking.appointmentTime).toLocaleString()}</p>
                <p className="status">✅ {booking.status}</p>
                <button className="btn" onClick={() => handleJoinMeeting(booking)}>
                  Join Meeting
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Teleconsultation;
