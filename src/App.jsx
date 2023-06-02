import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Face from "./components/Face/Face";
import Labels from "./components/Labels/Labels";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Face />
      <Labels />
      <Footer />
    </div>
  );
}

export default App;
