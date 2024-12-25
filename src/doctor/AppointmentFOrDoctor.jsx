import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AppointmentForDoctor = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // To track the selected appointment
  const [description, setDescription] = useState(""); // To track the doctor's description
  const [isPopupOpen, setIsPopupOpen] = useState(false); // To control the popup visibility

  // Fetch appointments for the logged-in user
  useEffect(() => {
    const fetchAppointments = async () => {
      const userId = localStorage.getItem("userId"); // Get the logged-in user's ID from localStorage

      try {
        const response = await fetch(`https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/appointmentsAssigned?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error fetching appointments");
        }

        setAppointments(data); // Update state with appointments
      } catch (error) {
        setError(error.message); // Set error if any
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAppointments();
  }, []); // Runs only once when the component mounts

  // Function to handle the Checkup button click
  const handleCheckupClick = (appointmentId) => {
    const selected = appointments.find((appointment) => appointment._id === appointmentId);
    setSelectedAppointment(selected);
    setIsPopupOpen(true); // Open the popup when the button is clicked
  };

 
  const handleSaveDescription = async () => {
    if (!description) {
      Swal.fire({
        title: "Error!",
        text: "Description cannot be empty.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
  
    try {
      const response = await fetch(`https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/Checkup/${selectedAppointment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error saving description");
      }
  
      Swal.fire({
        title: "Success!",
        text: "Description saved successfully.",
        icon: "success",
        confirmButtonText: "Ok",
      });
  
      setIsPopupOpen(false); // Close the popup after saving
      setDescription(""); // Reset the description field
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  

  // Render table
  return (
    <div className="appointments-table-container">
      {/* Loading state */}
      {loading && <p>Loading appointments...</p>}

      {/* If there are no appointments */}
      {appointments.length === 0 && !loading && !error && <p>No appointments found</p>}

      {/* Appointments Table */}
      <table className="appointments-table mt-10">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Age</th>
            <th>Problem</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.userId.fname} {appointment.userId.lname}</td>
              <td>{appointment.userId.city}</td>
              <td>{appointment.userId.age}</td>
              <td>{appointment.problem}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td>{appointment.appointmentTime}</td>
              <td>
                <button onClick={() => handleCheckupClick(appointment._id)}>CheckUp</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Description Popup */}
      {isPopupOpen && selectedAppointment && (
        <div className="doctor-description-popup">
          <h1>Write Description for {selectedAppointment.userId.fname} {selectedAppointment.userId.lname}</h1>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write the description here..."
          />
          <div className="popup-actions">
            <button onClick={handleSaveDescription}>Save Description</button>
            <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForDoctor;
