import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [appointmentsStats, setAppointmentsStats] = useState({
    totalPendingAppointments: 0,
    totalAssignedAppointments: 0,
    totalCompletedAppointments: 0,
    totalAppointments: 0,
  });
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAdmins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user role stats (Patients, Doctors, Admins)
  useEffect(() => {
    const fetchUserRoleStats = async () => {
      try {
        const response = await fetch('https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/userRoleStats', {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error fetching user role stats");
        setStats(data); // Set user role stats
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    // Fetch appointment stats (Pending, Assigned, Completed)
    const fetchAppointmentsStats = async () => {
      try {
        const response = await fetch('https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/appointmentsStats', {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error fetching appointment stats');
        setAppointmentsStats(data); // Set appointment stats
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchUserRoleStats();
    fetchAppointmentsStats();
  }, []); // Run only once on component mount

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* Loading and Error States */}
      {loading && <p>Loading dashboard...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Stats after fetching data */}
      {!loading && !error && (
        <>
          {/* User Role Stats Section */}
          <div className="user-role-stats-cards">
            <div className="user-role-stat-card">
              <h3>Total Patients</h3>
              <p>{stats.totalPatients}</p>
            </div>
            <div className="user-role-stat-card">
              <h3>Total Doctors</h3>
              <p>{stats.totalDoctors}</p>
            </div>
            <div className="user-role-stat-card">
              <h3>Total Admins</h3>
              <p>{stats.totalAdmins}</p>
            </div>
          </div>

          {/* Appointments Stats Section */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Total Appointments Pending</h3>
              <p>{appointmentsStats.totalPendingAppointments}</p>
            </div>
            <div className="dashboard-card">
              <h3>Total Appointments Assigned</h3>
              <p>{appointmentsStats.totalAssignedAppointments}</p>
            </div>
            <div className="dashboard-card">
              <h3>Total Appointments Completed</h3>
              <p>{appointmentsStats.totalCompletedAppointments}</p>
            </div>
            <div className="dashboard-card">
              <h3>Total Appointments</h3>
              <p>{appointmentsStats.totalAppointments}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
