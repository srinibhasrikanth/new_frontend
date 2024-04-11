import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import VolunteerDashboard from "./pages/Volunteer/VolunteerDashboard";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin-dashboard/:token/:id"
          element={<AdminDashboard />}
        />
         <Route
          path="/volunteer-dashboard/:token/:id"
          element={<VolunteerDashboard />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
