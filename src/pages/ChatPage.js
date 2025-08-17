
import React, { useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage";
import DoctorListMessage from "../components/DoctorListMessage";
import FormMessage from "../components/FormMessage";

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
  backgroundColor: "rgba(255, 255, 255, 0.9)",
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
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingDoctors, showForm]);

  // Default starting message
  const startingMessage = {
    from: "system",
    text: "👋 Hello Users! Welcome to the Hospital Booking Chat.First time it takes up to one minute to start your Booking Bot .Just type Hello to start chat ",
  };

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
          {/* Starting message */}
          <ChatMessage from={startingMessage.from} text={startingMessage.text} />

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

          {/* Dummy div to scroll into */}
          <div ref={chatEndRef} />
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


