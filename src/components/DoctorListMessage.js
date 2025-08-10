import React from "react";

export default function DoctorListMessage({ doctors, onSelect }) {
  return (
    <div style={{ padding: "10px", background: "#f9f9f9", borderRadius: "10px" }}>
      <h4>Select a doctor:</h4>
      {doctors.map((doc) => (
        <div
          key={doc.doctor_id}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            margin: "5px 0",
            cursor: "pointer",
            background: "#fff",
          }}
          onClick={() => onSelect(doc)}
        >
          <b>Dr. {doc.doctor_name}</b> — {doc.specialization}
        </div>
      ))}
    </div>
  );
}
