// // src/pages/ChatPage.js
// import React from "react";
// import ChatMessage from "../components/ChatMessage";
// import DoctorListMessage from "../components/DoctorListMessage";
// import FormMessage from "../components/FormMessage";

// export default function ChatPage({
//   messages,
//   pendingDoctors,
//   showForm,
//   handleDoctorSelect,
//   handleFormSubmit,
//   input,
//   setInput,
//   handleSubmit
// }) {
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
//         {/* Chat history */}
//         {messages.map((msg, i) => (
//           <ChatMessage key={i} from={msg.from} text={msg.text} />
//         ))}

//         {/* Show doctor selection if needed */}
//         {pendingDoctors && (
//           <DoctorListMessage doctors={pendingDoctors} onSelect={handleDoctorSelect} />
//         )}

//         {/* Show booking form if needed */}
//         {showForm && <FormMessage onSubmit={handleFormSubmit} />}
//       </div>
//       {/* Message input if not selecting doctor or filling form */}
//       {!pendingDoctors && !showForm && (
//         <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: "10px" }}>
//           <input
//             style={{ flex: 1, padding: "10px" }}
//             value={input}
//             onChange={e => setInput(e.target.value)}
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


// src/pages/ChatPage.js
import React from "react";
import ChatMessage from "../components/ChatMessage";
import DoctorListMessage from "../components/DoctorListMessage";
import FormMessage from "../components/FormMessage";

const backgroundStyle = {
  backgroundImage: "url('/Doctor.jpg')",  // same image in public/Doctor/
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
  backgroundColor: "rgba(255, 255, 255, 0.9)", // white background with some transparency for readability
  borderRadius: "8px",
  padding: "20px",
  color: "#000",
};

export default function ChatPage({
  messages,
  pendingDoctors,
  showForm,
  handleDoctorSelect,
  handleFormSubmit,
  input,
  setInput,
  handleSubmit,
}) {
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
          }}
        >
          {/* Chat history */}
          {messages.map((msg, i) => (
            <ChatMessage key={i} from={msg.from} text={msg.text} />
          ))}

          {/* Show doctor selection if needed */}
          {pendingDoctors && (
            <DoctorListMessage doctors={pendingDoctors} onSelect={handleDoctorSelect} />
          )}

          {/* Show booking form if needed */}
          {showForm && <FormMessage onSubmit={handleFormSubmit} />}
        </div>
        {/* Message input if not selecting doctor or filling form */}
        {!pendingDoctors && !showForm && (
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
