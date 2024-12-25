import React, { useState } from 'react';
import Swal from "sweetalert2";
const TakeAppointments = () => {
  // Set initial state for form data (only includes problem, date, and time)
  const [formData, setFormData] = useState({
    problem: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  const [loading, setLoading] = useState(false);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const userId = localStorage.getItem("userId");  // Get the logged-in userId from localStorage
    
    const appointmentData = {
      problem: formData.problem,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      userId,  // Include the userId in the data
    };
  
    try {
      const response = await fetch("https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });
  
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message);
      }
  
      Swal.fire({
        title: "Success!",
        text: result.message,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='wrap'>

 
      <form className="form-take-Appointments" onSubmit={handleSubmit}>
        <div className="form-left">
          {/* Problem description */}
          <div>
            <label>Problem</label>
            <input
              type="text"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
            />
          </div>

          {/* Appointment Date */}
          <div>
            <label>Appointment Date</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Appointment Time */}
          <div>
            <label>Appointment Time</label>
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="btn-wrap">
          <button type="submit" disabled={loading}>
            {loading ? "Booking Appointment..." : "Book Appointment"}
          </button>
        </div>
      </form>
      </div>
    </>
  );
};

export default TakeAppointments;
