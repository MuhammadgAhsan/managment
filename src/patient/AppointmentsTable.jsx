import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments for the logged-in user
  useEffect(() => {
    const fetchAppointments = async () => {
      const userId = localStorage.getItem("userId"); // Get the logged-in user's ID from localStorage

      try {
        const response = await fetch(`https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/appointments?userId=${userId}`, {
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

  // Function to delete appointment
  const handleDelete = async (appointmentId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/appointments/${appointmentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Error deleting appointment");
        }

        // Remove deleted appointment from the state (update table)
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );

        Swal.fire({
          title: "Deleted!",
          text: "The appointment has been deleted.",
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
      }
    }
  };

  // Render table
  return (
    <div className="appointments-table-container">
      

      {/* Loading state */}
      {loading && <p>Loading appointments...</p>}

     

      {/* If there are no appointments */}
     

    
        <table className="appointments-table mt-10">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Assigned Doctor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

        <tr>
          <td>
          {appointments.length === 0 || !loading || !error || (
        <p>No appointments found</p>
      )}
          
            </td></tr>   {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.problem}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.status}</td>
                <td>{appointment.doctorId ? appointment.doctorId.name : "Not assigned"}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(appointment._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    
    </div>
  );
};

export default AppointmentsTable;
