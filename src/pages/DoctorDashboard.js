


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BASE_URL = "https://hospital-backend-1-ygmp.onrender.com";

// export default function App() {
//   const [patientsByDate, setPatientsByDate] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [doctorProfile, setDoctorProfile] = useState(null);
//   const [availability, setAvailability] = useState({
//     date: "",
//     start_time: "",
//     end_time: "",
//     specialization: "",
//     room_number: "",
//   });
//   const [showAvailabilitySuccess, setShowAvailabilitySuccess] = useState(false);
//   const [showMarkCompleteSuccess, setShowMarkCompleteSuccess] = useState(false);

//   const Modal = ({ message, onClose }) => (
//     <div
//       className="modal fade show"
//       style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
//       tabIndex="-1"
//       role="dialog"
//     >
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Message</h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={onClose}
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">
//             <p>{message}</p>
//           </div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={onClose}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const doctortoken = localStorage.getItem("doctorToken");

//   useEffect(() => {
//     async function fetchDoctorProfile() {
//       try {
//         const res = await axios.get(`${BASE_URL}/doctor/profile`, {
//           headers: { Authorization: `Bearer ${doctortoken}` },
//         });
//         setDoctorProfile(res.data);
//         setAvailability((prev) => ({
//           ...prev,
//           specialization: res.data.specialization || "",
//           room_number: res.data.room_number || "",
//         }));
//       } catch (err) {
//         console.error("Failed to fetch doctor profile:", err);
//       }
//     }
//     if (doctortoken) fetchDoctorProfile();
//   }, [doctortoken]);

//   useEffect(() => {
//     async function fetchPatientsToday() {
//       try {
//         const res = await axios.get(`${BASE_URL}/doctor/patients_today`, {
//           headers: { Authorization: `Bearer ${doctortoken}` },
//         });
//         setPatientsByDate(res.data); // now storing grouped patients
//       } catch (err) {
//         console.error("Failed to fetch patients today:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (doctortoken) fetchPatientsToday();
//   }, [doctortoken]);

//   function handleInputChange(e) {
//     const { name, value } = e.target;
//     if (name === "specialization" || name === "room_number") return;
//     setAvailability((prev) => ({ ...prev, [name]: value }));
//   }

//   async function submitAvailability(e) {
//     e.preventDefault();
//     try {
//       const payload = {
//         date: availability.date,
//         start_time: availability.start_time,
//         end_time: availability.end_time,
//         specialization: availability.specialization,
//         room_number: availability.room_number,
//       };

//       await axios.post(`${BASE_URL}/doctor/availability/create`, payload, {
//         headers: { Authorization: `Bearer ${doctortoken}` },
//       });
//       alert("Availability created successfully!");
//       setShowAvailabilitySuccess(true);
//       setAvailability((prev) => ({
//         ...prev,
//         date: "",
//         start_time: "",
//         end_time: "",
//       }));
//     } catch (error) {
//       console.error("Error creating availability:", error);
//       setShowAvailabilitySuccess(false);
//       alert("Failed to create availability. Please check your permissions.");
//     }
//   }

//   async function markCompleted(patient_id, dateKey) {
//     try {
//       await axios.post(
//         `${BASE_URL}/doctor/mark_completed/${patient_id}`,
//         {},
//         { headers: { Authorization: `Bearer ${doctortoken}` } }
//       );
//       setPatientsByDate((prev) => {
//         const updated = { ...prev };
//         updated[dateKey] = updated[dateKey].map((p) =>
//           p.patient_id === patient_id ? { ...p, status: "completed" } : p
//         );
//         return updated;
//       });
//       setShowMarkCompleteSuccess(true);
//     } catch (error) {
//       console.error("Error marking patient completed:", error);
//       alert("Failed to mark patient as completed.");
//     }
//   }

//   if (loading)
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="fs-4 text-secondary">Loading dashboard...</div>
//       </div>
//     );

//   return (
//     <div className="container my-5">
//       <header className="d-flex justify-content-between align-items-center mb-4">
//         <h1>Doctor Dashboard</h1>
//         {doctorProfile && (
//           <div className="fs-5 fw-semibold text-primary">
//             Welcome, Dr. {doctorProfile.doctor_name || doctorProfile.name}
//           </div>
//         )}
//       </header>

//       {/* Availability Form */}
//       <section className="mb-5 p-4 border rounded shadow-sm bg-white">
//         <h2 className="mb-4">Add New Availability</h2>
//         <form onSubmit={submitAvailability} className="row g-3">
//           <div className="col-md-4">
//             <label htmlFor="date" className="form-label">Date</label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={availability.date}
//               onChange={handleInputChange}
//               required
//               className="form-control"
//             />
//           </div>

//           <div className="col-md-4">
//             <label htmlFor="start_time" className="form-label">Start Time</label>
//             <input
//               type="time"
//               id="start_time"
//               name="start_time"
//               value={availability.start_time}
//               onChange={handleInputChange}
//               required
//               className="form-control"
//             />
//           </div>

//           <div className="col-md-4">
//             <label htmlFor="end_time" className="form-label">End Time</label>
//             <input
//               type="time"
//               id="end_time"
//               name="end_time"
//               value={availability.end_time}
//               onChange={handleInputChange}
//               required
//               className="form-control"
//             />
//           </div>

//           <div className="col-md-6">
//             <label htmlFor="specialization" className="form-label">Specialization</label>
//             <input
//               type="text"
//               id="specialization"
//               name="specialization"
//               value={availability.specialization}
//               readOnly
//               className="form-control bg-light"
//             />
//           </div>

//           <div className="col-md-6">
//             <label htmlFor="room_number" className="form-label">Room Number</label>
//             <input
//               type="text"
//               id="room_number"
//               name="room_number"
//               value={availability.room_number}
//               readOnly
//               className="form-control bg-light"
//             />
//           </div>

//           <div className="col-12 text-end">
//             <button type="submit" className="btn btn-primary px-4">
//               Add Availability
//             </button>
//           </div>
//         </form>
//       </section>

//       {/* Patients by Date */}
//       <section className="p-4 border rounded shadow-sm bg-white">
//         <h2 className="mb-4">Patients</h2>
//         {Object.keys(patientsByDate).length === 0 ? (
//           <p className="text-muted">No patients scheduled.</p>
//         ) : (
//           Object.entries(patientsByDate).map(([dateKey, patients]) => (
//             <div key={dateKey} className="mb-5">
//               <h4 className="text-primary mb-3">📅 {dateKey}</h4>
//               <div className="table-responsive">
//                 <table className="table table-striped table-bordered align-middle">
//                   <thead className="table-light">
//                     <tr>
//                       <th>Name</th>
//                       <th>Age</th>
//                       <th>Gender</th>
//                       <th>Residence</th>
//                       <th>Appointment Time</th>
//                       <th>Token</th>
//                       <th>Status</th>
//                       <th style={{ width: "140px" }}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {patients.map((p) => (
//                       <tr key={p.patient_id}>
//                         <td>{p.patient_name}</td>
//                         <td>{p.age}</td>
//                         <td>{p.gender}</td>
//                         <td>{p.residence}</td>
//                         <td>{new Date(p.appointment_time).toLocaleTimeString()}</td>
//                         <td>{p.token_id}</td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               p.status === "completed"
//                                 ? "bg-success"
//                                 : "bg-warning text-dark"
//                             }`}
//                           >
//                             {p.status}
//                           </span>
//                         </td>
//                         <td>
//                           {p.status !== "completed" && (
//                             <button
//                               onClick={() => markCompleted(p.patient_id, dateKey)}
//                               className="btn btn-sm btn-outline-primary"
//                             >
//                               Mark Completed
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ))
//         )}
//       </section>

//       {showAvailabilitySuccess && (
//         <Modal
//           message="Availability created successfully!"
//           onClose={() => setShowAvailabilitySuccess(false)}
//         />
//       )}
//       {showMarkCompleteSuccess && (
//         <Modal
//           message="Patient marked as completed!"
//           onClose={() => setShowMarkCompleteSuccess(false)}
//         />
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://hospital-backend-1-ygmp.onrender.com";

export default function App() {
  const [patientsByDate, setPatientsByDate] = useState({});
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
  
  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

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
            <button type="button" className="btn btn-primary" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const doctortoken = localStorage.getItem("doctorToken");

  useEffect(() => {
    async function fetchDoctorProfile() {
      try {
        const res = await axios.get(`${BASE_URL}/doctor/profile`, {
          headers: { Authorization: `Bearer ${doctortoken}` },
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
    if (doctortoken) fetchDoctorProfile();
  }, [doctortoken]);

  useEffect(() => {
    async function fetchPatientsToday() {
      try {
        const res = await axios.get(`${BASE_URL}/doctor/patients_today`, {
          headers: { Authorization: `Bearer ${doctortoken}` },
        });
        setPatientsByDate(res.data);
      } catch (err) {
        console.error("Failed to fetch patients today:", err);
      } finally {
        setLoading(false);
      }
    }
    if (doctortoken) fetchPatientsToday();
  }, [doctortoken]);

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
        headers: { Authorization: `Bearer ${doctortoken}` },
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

  async function markCompleted(patient_id, dateKey) {
    try {
      await axios.post(
        `${BASE_URL}/doctor/mark_completed/${patient_id}`,
        {},
        { headers: { Authorization: `Bearer ${doctortoken}` } }
      );
      setPatientsByDate((prev) => {
        const updated = { ...prev };
        updated[dateKey] = updated[dateKey].map((p) =>
          p.patient_id === patient_id ? { ...p, status: "completed" } : p
        );
        return updated;
      });
      setShowMarkCompleteSuccess(true);
    } catch (error) {
      console.error("Error marking patient completed:", error);
      alert("Failed to mark patient as completed.");
    }
  }

  // Search functionality
  async function handleSearch() {
    if (!searchQuery && !searchDate) {
      alert("Please enter a patient name or select a date to search");
      return;
    }

    setSearchLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (searchDate) params.append('day', searchDate);

      const res = await axios.get(`${BASE_URL}/doctor/search?${params.toString()}`, {
        headers: { Authorization: `Bearer ${doctortoken}` },
      });
      setSearchResults(res.data);
    } catch (error) {
      console.error("Error searching patients:", error);
      alert("Failed to search patients.");
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }

  function clearSearch() {
    setSearchQuery("");
    setSearchDate("");
    setSearchResults([]);
  }

  // Calculate statistics
  const calculateStats = () => {
    const today = new Date().toDateString();
    let todayBooked = 0;
    let todayCompleted = 0;
    let totalBooked = 0;
    let totalCompleted = 0;

    Object.entries(patientsByDate).forEach(([dateKey, patients]) => {
      const isToday = new Date(dateKey).toDateString() === today;
      
      patients.forEach(patient => {
        if (isToday) {
          todayBooked++;
          if (patient.status === 'completed') todayCompleted++;
        }
        totalBooked++;
        if (patient.status === 'completed') totalCompleted++;
      });
    });

    return { todayBooked, todayCompleted, totalBooked, totalCompleted };
  };

  const stats = calculateStats();

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="fs-4 text-secondary">Loading dashboard...</div>
      </div>
    );

  return (
    <div className="container-fluid my-5">
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
            <label htmlFor="date" className="form-label">Date</label>
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
            <label htmlFor="start_time" className="form-label">Start Time</label>
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
            <label htmlFor="end_time" className="form-label">End Time</label>
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
            <label htmlFor="specialization" className="form-label">Specialization</label>
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
            <label htmlFor="room_number" className="form-label">Room Number</label>
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

      {/* Search Section with Statistics Boxes */}
      <div className="row mb-5">
        {/* Search Section */}
        <div className="col-lg-8">
          <section className="p-4 border rounded shadow-sm bg-white h-100">
            <h2 className="mb-4">Search Patients</h2>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label htmlFor="searchQuery" className="form-label">Patient Name</label>
                <input
                  type="text"
                  id="searchQuery"
                  className="form-control"
                  placeholder="Enter patient name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="searchDate" className="form-label">Date</label>
                <input
                  type="date"
                  id="searchDate"
                  className="form-control"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
              <div className="col-md-4 d-flex align-items-end gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSearch}
                  disabled={searchLoading}
                >
                  {searchLoading ? "Searching..." : "Search"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={clearSearch}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-3">Search Results ({searchResults.length} patients found)</h4>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Appointment Time</th>
                        <th>Token</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((patient) => (
                        <tr key={patient.patient_id}>
                          <td>{patient.name}</td>
                          <td>{new Date(patient.appointment_time).toLocaleString()}</td>
                          <td>{patient.token}</td>
                          <td>
                            <span
                              className={`badge ${
                                patient.status === "completed"
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {patient.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {searchResults.length === 0 && (searchQuery || searchDate) && !searchLoading && (
              <div className="alert alert-info mt-4">
                No patients found matching your search criteria.
              </div>
            )}
          </section>
        </div>

        {/* Statistics Boxes */}
        <div className="col-lg-4">
          <div className="row g-3 h-100">
            {/* Today's Patients Box */}
            <div className="col-12">
              <div className="card border-primary shadow-sm h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">📅 Today's Patients</h5>
                </div>
                <div className="card-body d-flex flex-column justify-content-center">
                  <div className="row text-center">
                    <div className="col-6">
                      <div className="border-end">
                        <h2 className="text-warning mb-1">{stats.todayBooked}</h2>
                        <small className="text-muted">Total Booked</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <h2 className="text-success mb-1">{stats.todayCompleted}</h2>
                      <small className="text-muted">Completed</small>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                          width: stats.todayBooked > 0 ? `${(stats.todayCompleted / stats.todayBooked) * 100}%` : '0%'
                        }}
                      ></div>
                    </div>
                    <small className="text-muted">
                      {stats.todayBooked > 0 ? Math.round((stats.todayCompleted / stats.todayBooked) * 100) : 0}% completed today
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Statistics Box */}
            <div className="col-12">
              <div className="card border-info shadow-sm h-100">
                <div className="card-header bg-info text-white">
                  <h5 className="card-title mb-0">📊 Overall Statistics</h5>
                </div>
                <div className="card-body d-flex flex-column justify-content-center">
                  <div className="row text-center">
                    <div className="col-6">
                      <div className="border-end">
                        <h2 className="text-primary mb-1">{stats.totalBooked}</h2>
                        <small className="text-muted">Total Patients</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <h2 className="text-success mb-1">{stats.totalCompleted}</h2>
                      <small className="text-muted">Completed</small>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                          width: stats.totalBooked > 0 ? `${(stats.totalCompleted / stats.totalBooked) * 100}%` : '0%'
                        }}
                      ></div>
                    </div>
                    <small className="text-muted">
                      {stats.totalBooked > 0 ? Math.round((stats.totalCompleted / stats.totalBooked) * 100) : 0}% overall completion rate
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patients by Date */}
      <section className="p-4 border rounded shadow-sm bg-white">
        <h2 className="mb-4">Patients</h2>
        {Object.keys(patientsByDate).length === 0 ? (
          <p className="text-muted">No patients scheduled.</p>
        ) : (
          Object.entries(patientsByDate).map(([dateKey, patients]) => (
            <div key={dateKey} className="mb-5">
              <h4 className="text-primary mb-3">📅 {dateKey}</h4>
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
                    {patients.map((p) => (
                      <tr key={p.patient_id}>
                        <td>{p.patient_name}</td>
                        <td>{p.age}</td>
                        <td>{p.gender}</td>
                        <td>{p.residence}</td>
                        <td>{new Date(p.appointment_time).toLocaleTimeString()}</td>
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
                              onClick={() => markCompleted(p.patient_id, dateKey)}
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
            </div>
          ))
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
