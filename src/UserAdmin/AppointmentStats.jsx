import React, { useState, useEffect } from "react";

const AppointmentStats = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalPendingAppointments: 0,
    totalAssignedAppointments: 0,
    totalCompletedAppointments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the appointment statistics
  useEffect(() => {
    const fetchAppointmentStats = async () => {
      try {
        const response = await fetch('https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/appointmentsStats', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error fetching appointment stats");
        }

        setStats(data); // Set the fetched stats to state
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchAppointmentStats();
  }, []); // Runs only once when the component mounts

  return (
    <div className="appointment-stats-container">
      {loading && <p>Loading appointment statistics...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="appointment-stats-cards">
          <h2>Appointment Statistics</h2>

          <div className="appointment-stat-card">
            <h3>Total Appointments</h3>
            <p>{stats.totalAppointments}</p>
          </div>

          <div className="appointment-stat-card">
            <h3>Pending Appointments</h3>
            <p>{stats.totalPendingAppointments}</p>
          </div>

          <div className="appointment-stat-card">
            <h3>Assigned Appointments</h3>
            <p>{stats.totalAssignedAppointments}</p>
          </div>

          <div className="appointment-stat-card">
            <h3>Completed Appointments</h3>
            <p>{stats.totalCompletedAppointments}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentStats;
