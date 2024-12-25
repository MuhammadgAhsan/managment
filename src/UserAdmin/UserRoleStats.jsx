import React, { useState, useEffect } from "react";

const UserRoleStats = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAdmins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the user role statistics
  useEffect(() => {
    const fetchUserRoleStats = async () => {
      try {
        const response = await fetch('https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/userRoleStats', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error fetching user role stats");
        }

        setStats(data); // Set the fetched stats to state
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchUserRoleStats();
  }, []); // Runs only once when the component mounts

  return (
    <div className="user-role-stats-container">
      {loading && <p>Loading user role statistics...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="user-role-stats-cards">
          <h2>User Role Statistics</h2>

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
      )}
    </div>
  );
};

export default UserRoleStats;
