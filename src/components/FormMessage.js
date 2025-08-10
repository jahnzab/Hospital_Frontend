import React, { useState } from "react";

export default function FormMessage({ onSubmit }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [residence, setResidence] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !age || !gender || !residence || !date) return;
    
    // Validate age
    const ageNum = Number(age);
    if (ageNum < 1 || ageNum > 120) {
      alert("Please enter a valid age between 1 and 120");
      return;
    }
    
    // Validate name (should not be just numbers)
    if (/^\d+$/.test(name.trim())) {
      alert("Please enter a valid name, not just numbers");
      return;
    }
    
    onSubmit({ name, age, gender, residence, date });
    // Optionally, clear fields after submit:
    setName(""); setAge(""); setGender(""); setResidence(""); setDate("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#f5f6fa",
        padding: "15px",
        borderRadius: "12px",
        margin: "10px 0",
        boxShadow: "0 0 6px rgba(0,0,0,0.05)"
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>Patient Details</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="Age"
          type="number"
          min="1"
          max="120"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
        />
        <select
          value={gender}
          onChange={e => setGender(e.target.value)}
          required
        >
          <option value="">Gender...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          placeholder="Residence / City"
          value={residence}
          onChange={e => setResidence(e.target.value)}
          required
        />
        <input
          placeholder="Preferred Date (YYYY-MM-DD)"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <button type="submit" style={{ background: "#007bfc", color: "#fff", border: "none", borderRadius: "6px", padding: "8px", marginTop: "8px" }}>
          Book Appointment
        </button>
      </div>
    </form>
  );
}
