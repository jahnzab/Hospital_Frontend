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
import React, { useState } from "react";
import "../App.css";


import himage from   "../assets/heart.jpeg"
import bimage from "../assets/brain.jpeg";
import gimage from  "../assets/gastro.jpeg"
import oimage from  "../assets/ortho.jpeg"
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [active ,setActive] = useState(null);
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
  const handleClick= (id) => {
  setActive(id);
  };
  const specialties = [
  {
    id: "cardiac",
    title: "Cardiology",
    text: "We've been at the forefront of heart care for 24+ years, combining advanced technology with expert treatment to deliver the best outcomes.",
    image: himage,
  },

  {
    id: "neuro",
    title: "Neurology",
    text: "We offer specialised care for a wide range of neurological disorders in adults & children and are equipped with advanced technologies.",
    image: bimage,
  },
  {
    id: "gastro",
    title: "Gastro Sciences",
    text: "We're one of the leading gastroenterology hospitals in India, specialising in treating digestive & liver-related diseases in adults & kids.",
    image: gimage,
  },
  {
    id: "ortho",
    title: "Orthopaedics",
    text: "As leaders in orthopaedics, we offer care for bone, joint & spine issues, supported by a team of experts and state-of-the-art facilities.",
    image: oimage,
  },
];

  return (
    <>
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        <h2>Welcome to the Hospital Booking System</h2>
        <p>
          Use the navigation above to book an appointment with our chatbot,<br />
          log in as a doctor to manage your patients, or register as an admin.
        </p>
      </div>
    </div>
    <section className="container my-5">
  <h2 className="text-center mb-4">Our Centres of Excellence</h2>
  <div className="row">
    {specialties.map((spec) => (
      <div
        key={spec.id}
        className="col-12 col-sm-6 col-lg-4 mb-4"
        onClick={() => handleClick(spec.id)}
      >
        <div
          className="excellence-card card text-center"
          style={{
            backgroundImage: `url(${spec.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="card-body">
            <h5 className="card-title">{spec.title}</h5>
            <p className="card-text">{spec.text}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
    </>
  );
}
