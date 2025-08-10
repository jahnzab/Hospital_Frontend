

import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

export default function App() {
  const [patientsToday, setPatientsToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [availability, setAvailability] = useState({
    date: "",
    start_time: "",
    end_time: "",
    specialization: "",
    room_number: "",
  });
  const [showAvailabilitySuccess, setShowAvailabilitySuccess] = useState(false);
  const [showMarkCompleteSuccess, setShowMarkCompleteSuccess] = useState(false);

  const Modal = ({ message, onClose }) => (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Message</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const token = localStorage.getItem("doctor_token");

  useEffect(() => {
    async function fetchDoctorProfile() {
      try {
        const res = await axios.get(`${BASE_URL}/doctor/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctorProfile(res.data);
        setAvailability((prev) => ({
          ...prev,
          specialization: res.data.specialization || "",
          room_number: res.data.room_number || "",
        }));
      } catch (err) {
        console.error("Failed to fetch doctor profile:", err);
      }
    }
    if (token) fetchDoctorProfile();
  }, [token]);

  useEffect(() => {
    async function fetchPatientsToday() {
      try {
        const res = await axios.get(`${BASE_URL}/doctor/patients_today`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatientsToday(res.data);
      } catch (err) {
        console.error("Failed to fetch patients today:", err);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchPatientsToday();
  }, [token]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "specialization" || name === "room_number") return;
    setAvailability((prev) => ({ ...prev, [name]: value }));
  }

  async function submitAvailability(e) {
    e.preventDefault();
    try {
      const payload = {
        date: availability.date,
        start_time: availability.start_time,
        end_time: availability.end_time,
        specialization: availability.specialization,
        room_number: availability.room_number,
      };

      await axios.post(`${BASE_URL}/doctor/availability/create`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Availability created successfully!");
      setShowAvailabilitySuccess(true);
      setAvailability((prev) => ({
        ...prev,
        date: "",
        start_time: "",
        end_time: "",
      }));
    } catch (error) {
      console.error("Error creating availability:", error);
      setShowAvailabilitySuccess(false);
      alert("Failed to create availability. Please check your permissions.");
    }
  }

  async function markCompleted(patient_id) {
    try {
      await axios.post(
        `${BASE_URL}/doctor/mark_completed/${patient_id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPatientsToday((prev) =>
        prev.map((p) =>
          p.patient_id === patient_id ? { ...p, status: "completed" } : p
        )
      );
      setShowMarkCompleteSuccess(true);
    } catch (error) {
      console.error("Error marking patient completed:", error);
      alert("Failed to mark patient as completed.");
    }
  }

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="fs-4 text-secondary">Loading dashboard...</div>
      </div>
    );

  return (
    <div className="container my-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1>Doctor Dashboard</h1>
        {doctorProfile && (
          <div className="fs-5 fw-semibold text-primary">
            Welcome, Dr. {doctorProfile.doctor_name || doctorProfile.name}
          </div>
        )}
      </header>

      {/* Availability Form */}
      <section className="mb-5 p-4 border rounded shadow-sm bg-white">
        <h2 className="mb-4">Add New Availability</h2>
        <form onSubmit={submitAvailability} className="row g-3">
          <div className="col-md-4">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={availability.date}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="start_time" className="form-label">
              Start Time
            </label>
            <input
              type="time"
              id="start_time"
              name="start_time"
              value={availability.start_time}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="end_time" className="form-label">
              End Time
            </label>
            <input
              type="time"
              id="end_time"
              name="end_time"
              value={availability.end_time}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="specialization" className="form-label">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={availability.specialization}
              readOnly
              className="form-control bg-light"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="room_number" className="form-label">
              Room Number
            </label>
            <input
              type="text"
              id="room_number"
              name="room_number"
              value={availability.room_number}
              readOnly
              className="form-control bg-light"
            />
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary px-4">
              Add Availability
            </button>
          </div>
        </form>
      </section>

      {/* Patients Today Table */}
      <section className="p-4 border rounded shadow-sm bg-white">
        <h2 className="mb-4">Patients Today</h2>
        {patientsToday.length === 0 ? (
          <p className="text-muted">No patients scheduled for today.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Residence</th>
                  <th>Appointment Time</th>
                  <th>Token</th>
                  <th>Status</th>
                  <th style={{ width: "140px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {patientsToday.map((p) => (
                  <tr key={p.patient_id}>
                    <td>{p.patient_name}</td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td>{p.residence}</td>
                    <td>{new Date(p.appointment_time).toLocaleString()}</td>
                    <td>{p.token_id}</td>
                    <td>
                      <span
                        className={`badge ${
                          p.status === "completed"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>
                      {p.status !== "completed" && (
                        <button
                          onClick={() => markCompleted(p.patient_id)}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showAvailabilitySuccess && (
        <Modal
          message="Availability created successfully!"
          onClose={() => setShowAvailabilitySuccess(false)}
        />
      )}
      {showMarkCompleteSuccess && (
        <Modal
          message="Patient marked as completed!"
          onClose={() => setShowMarkCompleteSuccess(false)}
        />
      )}
    </div>
  );
}
