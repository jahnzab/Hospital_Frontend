

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import api from "./api";

// import NavBar from "./components/NavBar";
// import ChatPage from "./pages/ChatPage";
// import DoctorLogin from "./pages/DoctorLogin";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import AdminRegister from "./pages/AdminRegister";
// import Home from "./pages/Home";

// export default function App() {
//   const [messages, setMessages] = useState([]);
//   const [sessionId] = useState(uuidv4());
//   const [pendingDoctors, setPendingDoctors] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [input, setInput] = useState("");

//   // Core chatbot methods
//   async function sendMessage(text) {
//     if (!text.trim()) return;
//     setMessages((m) => [...m, { from: "user", text }]);
//     setInput("");
//     try {
//       const res = await api.post("/chat", { session_id: sessionId, text });
//       if (res.data.reply) {
//         setMessages((m) => [...m, { from: "bot", text: res.data.reply }]);
//       }
//       setPendingDoctors(res.data.doctors || null);
//       setShowForm(!!res.data.show_form);
//     } catch {
//       setMessages((m) => [...m, { from: "bot", text: "⚠️ Error contacting server." }]);
//     }
//   }

//   const handleDoctorSelect = (doc) => {
//     setSelectedDoctor(doc);
//     setMessages((m) => [...m, { from: "user", text: `I choose Dr. ${doc.doctor_name}` }]);
//     setPendingDoctors(null);
//     sendMessage(doc.doctor_id.toString());
//   };

//   async function handleFormSubmit(data) {
//     try {
//       const res = await api.post("/patient/book", {
//         doctor_id: selectedDoctor.doctor_id,
//         patient: {
//           patient_name: data.name,
//           age: Number(data.age),
//           gender: data.gender,
//           residence: data.residence,
//         },
//         preferred_date: data.date,
//       });
//       setMessages((m) => [
//         ...m,
//         { from: "bot", text: `✅ Booking confirmed for Dr. ${selectedDoctor.doctor_name} at ${res.data.appointment_time} (Token: ${res.data.token_id})` },
//       ]);
//     } catch {
//       setMessages((m) => [...m, { from: "bot", text: "❌ Booking failed." }]);
//     }
//     setShowForm(false);
//     setSelectedDoctor(null);
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendMessage(input);
//   };

//   return (
//     <Router>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/booking"
//           element={
//             <ChatPage
//               messages={messages}
//               pendingDoctors={pendingDoctors}
//               showForm={showForm}
//               handleDoctorSelect={handleDoctorSelect}
//               handleFormSubmit={handleFormSubmit}
//               input={input}
//               setInput={setInput}
//               handleSubmit={handleSubmit}
//             />
//           }
//         />
//         <Route path="/doctor-login" element={<DoctorLogin />} />
//         <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
//         <Route path="/admin-register" element={<AdminRegister />} />
//       </Routes>
//     </Router>
//   );
// }


import React, { useState, useEffect } from "react";
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
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });

  const [sessionId] = useState(() => {
    return localStorage.getItem("chat_sessionId") || uuidv4();
  });

  const [pendingDoctors, setPendingDoctors] = useState(() => {
    const saved = localStorage.getItem("pending_doctors");
    return saved ? JSON.parse(saved) : null;
  });

  const [showForm, setShowForm] = useState(() => {
    return localStorage.getItem("show_form") === "true";
  });

  const [selectedDoctor, setSelectedDoctor] = useState(() => {
    const saved = localStorage.getItem("selected_doctor");
    return saved ? JSON.parse(saved) : null;
  });

  const [input, setInput] = useState("");

  // 🔹 Persist to localStorage
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chat_sessionId", sessionId);
  }, [sessionId]);

  useEffect(() => {
    localStorage.setItem("pending_doctors", JSON.stringify(pendingDoctors));
  }, [pendingDoctors]);

  useEffect(() => {
    localStorage.setItem("show_form", showForm);
  }, [showForm]);

  useEffect(() => {
    localStorage.setItem("selected_doctor", JSON.stringify(selectedDoctor));
  }, [selectedDoctor]);

  // 🔹 Add initial greeting only if no messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ from: "bot", text: "👋 Hi! How can I help you today?" }]);
    }
  }, []);

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
      setMessages((m) => [
        ...m,
        { from: "bot", text: "⚠️ Error contacting server." },
      ]);
    }
  }

  const handleDoctorSelect = (doc) => {
    setSelectedDoctor(doc);
    setMessages((m) => [
      ...m,
      { from: "user", text: `I choose Dr. ${doc.doctor_name}` },
    ]);
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
        {
          from: "bot",
          text: `✅ Booking confirmed for Dr. ${selectedDoctor.doctor_name} at ${res.data.appointment_time} (Token: ${res.data.token_id})`,
        },
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
