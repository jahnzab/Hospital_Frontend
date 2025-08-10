// import React, { useState } from "react";
// import api from "./api";
// import ChatMessage from "./components/ChatMessage";
// import DoctorListMessage from "./components/DoctorListMessage";
// import FormMessage from "./components/FormMessage";
// import { v4 as uuidv4 } from "uuid";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import DoctorLogin from "./pages/DoctorLogin";
// import DoctorDashboard from "./pages/DoctorDashboard";
// export default function App() {
//   const [messages, setMessages] = useState([]);
//   const [sessionId] = useState(uuidv4());
//   const [pendingDoctors, setPendingDoctors] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [input, setInput] = useState("");

//   // Cancel appointment handler
//   async function handleCancel(token) {
//     try {
//       const res = await api.post("/patient/cancel", { token_or_id: token });
//       setMessages((m) => [...m, { from: "bot", text: res.data.message }]);
//     } catch (err) {
//       setMessages((m) => [...m, { from: "bot", text: "❌ Cancel failed." }]);
//     }
//   }

//   // Reschedule appointment handler
//   async function handleReschedule(data) {
//     try {
//       const res = await api.post("/patient/reschedule", data);
//       setMessages((m) => [
//         ...m,
//         {
//           from: "bot",
//           text: `${res.data.message} New time: ${res.data.new_appointment_time}, Token: ${res.data.new_token}`,
//         },
//       ]);
//     } catch (err) {
//       setMessages((m) => [...m, { from: "bot", text: "❌ Reschedule failed." }]);
//     }
//   }

//   // Send message to /chat endpoint
//   async function sendMessage(text) {
//     if (!text.trim()) return;

//     setMessages((m) => [...m, { from: "user", text }]);
//     setInput("");

//     try {
//       const res = await api.post("/chat", {
//         session_id: sessionId,
//         text,
//       });

//       if (res.data.reply) {
//         setMessages((m) => [...m, { from: "bot", text: res.data.reply }]);
//       }

//       if (res.data.doctors) {
//         setPendingDoctors(res.data.doctors);
//       } else {
//         setPendingDoctors(null);
//       }

//       if (res.data.show_form) {
//         setShowForm(true);
//       } else {
//         setShowForm(false);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessages((m) => [
//         ...m,
//         { from: "bot", text: "⚠️ Error contacting server." },
//       ]);
//     }
//   }

//   // Handle doctor selection click
//   function handleDoctorSelect(doc) {
//     setSelectedDoctor(doc);
//     setMessages((m) => [
//       ...m,
//       { from: "user", text: `I choose Dr. ${doc.doctor_name}` },
//     ]);
//     setPendingDoctors(null);
//     sendMessage(doc.doctor_id.toString());
//   }

//   // Handle booking form submit
//   async function handleFormSubmit(data) {
//     try {
//       const res = await api.post("/patient/book", {
//         doctor_id: selectedDoctor.doctor_id,
//         patient_name: data.name,
//         age: Number(data.age),
//         gender: data.gender,
//         residence: data.residence,
//         preferred_date: data.date,
//       });

//       setMessages((m) => [
//         ...m,
//         {
//           from: "bot",
//           text: `✅ Booking confirmed for Dr. ${selectedDoctor.doctor_name} at ${res.data.appointment_time} (Token: ${res.data.token_id})`,
//         },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setMessages((m) => [...m, { from: "bot", text: "❌ Booking failed." }]);
//     }
//     setShowForm(false);
//     setSelectedDoctor(null);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     sendMessage(input);
//   }

//   return (
//     <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
//       <h2>Hospital Booking Chat</h2>

//       <div
//         style={{
//           height: "500px",
//           overflowY: "auto",
//           border: "1px solid #ccc",
//           padding: "10px",
//         }}
//       >
//         {messages.map((msg, i) => (
//           <ChatMessage key={i} from={msg.from} text={msg.text} />
//         ))}

//         {pendingDoctors && (
//           <DoctorListMessage doctors={pendingDoctors} onSelect={handleDoctorSelect} />
//         )}

//         {showForm && <FormMessage onSubmit={handleFormSubmit} />}
//       </div>

//       {!pendingDoctors && !showForm && (
//         <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: "10px" }}>
//           <input
//             style={{ flex: 1, padding: "10px" }}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//           />
//           <button type="submit" style={{ padding: "10px" }}>
//             Send
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import api from "./api";

import NavBar from "./components/NavBar";
import ChatPage from "./pages/ChatPage";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminRegister from "./pages/AdminRegister";
import Home from "./pages/Home";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [sessionId] = useState(uuidv4());
  const [pendingDoctors, setPendingDoctors] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [input, setInput] = useState("");

  // Core chatbot methods
  async function sendMessage(text) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    try {
      const res = await api.post("/chat", { session_id: sessionId, text });
      if (res.data.reply) {
        setMessages((m) => [...m, { from: "bot", text: res.data.reply }]);
      }
      setPendingDoctors(res.data.doctors || null);
      setShowForm(!!res.data.show_form);
    } catch {
      setMessages((m) => [...m, { from: "bot", text: "⚠️ Error contacting server." }]);
    }
  }

  const handleDoctorSelect = (doc) => {
    setSelectedDoctor(doc);
    setMessages((m) => [...m, { from: "user", text: `I choose Dr. ${doc.doctor_name}` }]);
    setPendingDoctors(null);
    sendMessage(doc.doctor_id.toString());
  };

  async function handleFormSubmit(data) {
    try {
      const res = await api.post("/patient/book", {
        doctor_id: selectedDoctor.doctor_id,
        patient: {
          patient_name: data.name,
          age: Number(data.age),
          gender: data.gender,
          residence: data.residence,
        },
        preferred_date: data.date,
      });
      setMessages((m) => [
        ...m,
        { from: "bot", text: `✅ Booking confirmed for Dr. ${selectedDoctor.doctor_name} at ${res.data.appointment_time} (Token: ${res.data.token_id})` },
      ]);
    } catch {
      setMessages((m) => [...m, { from: "bot", text: "❌ Booking failed." }]);
    }
    setShowForm(false);
    setSelectedDoctor(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/booking"
          element={
            <ChatPage
              messages={messages}
              pendingDoctors={pendingDoctors}
              showForm={showForm}
              handleDoctorSelect={handleDoctorSelect}
              handleFormSubmit={handleFormSubmit}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-register" element={<AdminRegister />} />
      </Routes>
    </Router>
  );
}
