


// // src/pages/ChatPage.js
// // import React from "react";
// // import ChatMessage from "../components/ChatMessage";
// // import DoctorListMessage from "../components/DoctorListMessage";
// // import FormMessage from "../components/FormMessage";

// // const backgroundStyle = {
// //   backgroundImage: "url('/Doctor.jpg')",  // same image in public/Doctor/
// //   backgroundSize: "cover",
// //   backgroundPosition: "center",
// //   minHeight: "100vh",
// //   padding: "20px",
// //   display: "flex",
// //   justifyContent: "center",
// //   alignItems: "flex-start",
// //   color: "#fff",
// // };

// // const containerStyle = {
// //   maxWidth: "600px",
// //   width: "100%",
// //   backgroundColor: "rgba(255, 255, 255, 0.9)", // white background with some transparency for readability
// //   borderRadius: "8px",
// //   padding: "20px",
// //   color: "#000",
// // };

// export default function ChatPage({
//   messages,
//   pendingDoctors,
//   showForm,
//   handleDoctorSelect,
//   handleFormSubmit,
//   input,
//   setInput,
//   handleSubmit,
// }) {
//   return (
//     <div style={backgroundStyle}>
//       <div style={containerStyle}>
//         <h2>Hospital Booking Chat</h2>
//         <div
//           style={{
//             height: "500px",
//             overflowY: "auto",
//             border: "1px solid #ccc",
//             padding: "10px",
//             borderRadius: "4px",
//             backgroundColor: "#fff",
//           }}
//         >
//           {/* Chat history */}
//           {messages.map((msg, i) => (
//             <ChatMessage key={i} from={msg.from} text={msg.text} />
//           ))}

//           {/* Show doctor selection if needed */}
//           {pendingDoctors && (
//             <DoctorListMessage doctors={pendingDoctors} onSelect={handleDoctorSelect} />
//           )}

//           {/* Show booking form if needed */}
//           {showForm && <FormMessage onSubmit={handleFormSubmit} />}
//         </div>
//         {/* Message input if not selecting doctor or filling form */}
//         {!pendingDoctors && !showForm && (
//           <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: "10px" }}>
//             <input
//               style={{ flex: 1, padding: "10px" }}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button type="submit" style={{ padding: "10px" }}>
//               Send
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage";

const backgroundStyle = {
  backgroundImage: "url('/Doctor.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  color: "#fff",
};

const containerStyle = {
  maxWidth: "600px",
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.95)",
  borderRadius: "8px",
  padding: "20px",
  color: "#000",
  display: "flex",
  flexDirection: "column",
};

export default function ChatPage({
  messages,
  pendingDoctors,
  pendingGenders,
  pendingDates,
  showForm,
  handleDoctorSelect,
  handleGenderSelect,
  handleDateSelect,
  handleFormSubmit,
  input,
  setInput,
  handleSubmit,
}) {
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingDoctors, pendingGenders, pendingDates]);

  return (
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        <h2>Hospital Booking Chat</h2>
        <div
          style={{
            height: "500px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: "#fff",
            flexGrow: 1,
          }}
        >
          {messages.map((msg, i) => (
            <ChatMessage key={i} from={msg.from} text={msg.text} />
          ))}

          {pendingDoctors && (
            <div style={{ marginTop: "10px" }}>
              <label>Select Doctor:</label>
              <select
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                onChange={(e) => handleDoctorSelect(e.target.value)}
              >
                <option value="">-- Select Doctor --</option>
                {pendingDoctors.map((doc) => (
                  <option key={doc.payload} value={doc.payload}>
                    {doc.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {pendingGenders && (
            <div style={{ marginTop: "10px" }}>
              <label>Select Gender:</label>
              <select
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                onChange={(e) => handleGenderSelect(e.target.value)}
              >
                <option value="">-- Select Gender --</option>
                {pendingGenders.map((g) => (
                  <option key={g.payload} value={g.payload}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {pendingDates && (
            <div style={{ marginTop: "10px" }}>
              <label>Select Date:</label>
              <select
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                onChange={(e) => handleDateSelect(e.target.value)}
              >
                <option value="">-- Select Date --</option>
                {pendingDates.map((d) => (
                  <option key={d.payload} value={d.payload}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showForm && (
            <div style={{ marginTop: "10px" }}>
              {/* Your existing form component */}
              <form onSubmit={handleFormSubmit}>
                {/* form inputs */}
              </form>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {!pendingDoctors && !pendingGenders && !pendingDates && !showForm && (
          <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: "10px" }}>
            <input
              style={{ flex: 1, padding: "10px" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" style={{ padding: "10px" }}>
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
