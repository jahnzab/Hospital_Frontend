// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AdminRegister() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8000/auth/register", {
//         ...form,
//         role: "admin",  // explicitly send role admin
//       });

//       // Save token in localStorage
//       localStorage.setItem("adminToken", res.data.access_token);
//       // Redirect to admin dashboard
//       navigate("/admin-dashboard");
//     } catch (err) {
//       setError("Registration failed. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div style={backgroundStyle}>
//       <div style={overlayStyle}>
//         <form style={formStyle} onSubmit={handleSubmit}>
//           <h2 style={{ textAlign: "center" }}>Admin Register</h2>
//           {error && <div style={errorStyle}>{error}</div>}

//           <label>Username</label>
//           <input
//             type="text"
//             value={form.username}
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//             required
//             style={inputStyle}
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//             style={inputStyle}
//           />

//           <button type="submit" style={buttonStyle}>
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // ===== Styles =====
// const backgroundStyle = {
//   height: "100vh",
//   backgroundImage:
//     "url('Doctor3.jpg')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const overlayStyle = {
//   backgroundColor: "rgba(255, 255, 255, 0.85)", // white with transparency
//   padding: "2rem",
//   borderRadius: "8px",
//   boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
//   width: "320px",
// };

// const formStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "0.5rem",
// };

// const inputStyle = {
//   padding: "0.5rem",
//   borderRadius: "4px",
//   border: "1px solid #ccc",
// };

// const buttonStyle = {
//   padding: "0.7rem",
//   background: "#1976D2",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   marginTop: "1rem",
//   cursor: "pointer",
// };

// const errorStyle = {
//   color: "red",
//   fontSize: "0.9rem",
//   textAlign: "center",
//   marginBottom: "0.5rem",
// };
import React, { useState } from "react";
import axios from "axios";

export default function AdminRegister() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/auth/register", {
        ...form,
        role: "admin",  // explicitly send role admin
      });

      // Save token in localStorage
      localStorage.setItem("adminToken", res.data.access_token);

      // Show success message instead of navigating away
      setSuccess(true);
      setForm({ username: "", password: "" });
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        {success ? (
          <div style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>
            Registration successful! You can now <a href="/doctor-login">go to your doctor login</a>.
          </div>
        ) : (
          <form style={formStyle} onSubmit={handleSubmit}>
            <h2 style={{ textAlign: "center" }}>Admin Register</h2>
            {error && <div style={errorStyle}>{error}</div>}

            <label>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              style={inputStyle}
            />

            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ===== Styles =====
const backgroundStyle = {
  height: "100vh",
  backgroundImage: "url('Doctor3.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const overlayStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.85)", // white with transparency
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  width: "320px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const inputStyle = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "0.7rem",
  background: "#1976D2",
  color: "white",
  border: "none",
  borderRadius: "4px",
  marginTop: "1rem",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  fontSize: "0.9rem",
  textAlign: "center",
  marginBottom: "0.5rem",
};
