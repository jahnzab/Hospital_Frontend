import React from "react";

export default function ChatMessage({ from, text }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: from === "user" ? "flex-end" : "flex-start",
        margin: "5px 0",
      }}
    >
      <div
        style={{
          background: from === "user" ? "#4cafef" : "#f1f1f1",
          color: from === "user" ? "#fff" : "#000",
          padding: "10px 15px",
          borderRadius: "15px",
          maxWidth: "70%",
        }}
      >
        {text}
      </div>
    </div>
  );
}
