// // src/pages/Home.js
// import React from "react";

// export default function Home() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Welcome to the Hospital Booking System</h2>
//       <h3><p>
//         Use the navigation above to book an appointment with our chatbot,<br/>
//         log in as a doctor to manage your patients, or register as an admin.
//       </p></h3>
//     </div>
//   );
// }


// src/pages/Home.js
import React from "react";

export default function Home() {
  const backgroundStyle = {
    backgroundImage: "url('Doctor.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    padding: "0 20px",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "40px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "0 auto",
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        <h2>Welcome to the Hospital Booking System</h2>
        <p>
          Use the navigation above to book an appointment with our chatbot,<br />
          log in as a doctor to manage your patients, or register as an admin.
        </p>
      </div>
    </div>
  );
}
