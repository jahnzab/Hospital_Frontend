// import React from "react";

// export default function DoctorListMessage({ doctors, onSelect }) {
//   return (
//     <div style={{ padding: "10px", background: "#f9f9f9", borderRadius: "10px" }}>
//       <h4>Select a doctor:</h4>
//       {doctors.map((doc) => (
//         <div
//           key={doc.doctor_id}
//           style={{
//             padding: "8px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             margin: "5px 0",
//             cursor: "pointer",
//             background: "#fff",
//           }}
//           onClick={() => onSelect(doc)}
//         >
//           <b>Dr. {doc.doctor_name}</b> — {doc.specialization}
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";

export default function DoctorListMessage({ doctors, onSelect }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <p>🩺 Please select a doctor:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {doctors.map((doc) => (
          <button
            key={doc.payload}
            onClick={() => onSelect(doc.payload)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #007bff",
              backgroundColor: "#fff",
              color: "#007bff",
              cursor: "pointer",
            }}
          >
            {doc.label}
          </button>
        ))}
      </div>
    </div>
  );
}
