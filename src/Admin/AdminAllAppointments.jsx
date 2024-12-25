import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";

const AdminAllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // Store list of doctors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Control the modal visibility
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null); // Store selected appointment for doctor assignment
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Store selected doctor

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/Allappointments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error fetching appointments');
      }

      setAppointments(data);  // Store appointments in state
    } catch (error) {
      setError(error.message); // Handle error
    } finally {
      setLoading(false); // End loading
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/doctor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error fetching doctors');
      }

      setDoctors(data);  // Store doctors in state
    } catch (error) {
      setError(error.message); // Handle error
    }
  };
  useEffect(() => {
   

    fetchAppointments();
    fetchDoctors(); // Fetch doctors data
  }, []);  // Runs once when component mounts

  // Handle opening the modal
  const openAssignDoctorModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeAssignDoctorModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null); // Reset selected doctor
  };

  // Handle assigning the doctor to the appointment
  const handleAssignDoctor = async () => {
    if (!selectedDoctor) {
      Swal.fire('Please select a doctor'); // Alert if no doctor is selected
      return;
    }

    try {
      const response = await fetch(`https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/appointments/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId: selectedDoctor._id ,appointmentId:selectedAppointmentId}),
      });

      if (response.ok) {
        Swal.fire('Doctor assigned successfully!');
        // Refetch the appointments after assigning
        fetchAppointments();
        closeAssignDoctorModal();
      } else {
        Swal.fire('Failed to assign doctor');
      }
    } catch (error) {
      Swal.fire('Error while assigning doctor');
    }
  };

  return (
    <>
      <div className="table-wrap">
        <div className="table-heading">All Appointments</div>
        <div>
          <table>
            <thead className="th-head">
              <tr>
                <th>Patient Name</th>
                <th>Patient Contact</th>
                <th>Problem</th>
                <th>Doctor Name</th>
                <th>Doctor Email</th>
                <th>Appointment Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.userId.fname} {appointment.userId.lname}</td>
                    <td>{appointment.userId.email}</td>
                    <td>{appointment.problem}</td>
                    <td>{appointment.doctorId ? `${appointment.doctorId.fname} ${appointment.doctorId.lname}` : 'Not assigned'}</td>
                    <td>{appointment.doctorId ? appointment.doctorId.email : 'N/A'}</td>
                    <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                    <td>{appointment.status}</td>
                    <td>
                      <button className="delete-btn" onClick={() => openAssignDoctorModal(appointment._id)}>
                        Assign
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for assigning doctor */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Assign Doctor</h2>
            <select
              value={selectedDoctor ? selectedDoctor._id : ""}
              onChange={(e) => {
                const selected = doctors.find((doc) => doc._id === e.target.value);
                setSelectedDoctor(selected);
              }}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.fname} {doctor.lname} - {doctor.email}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button onClick={handleAssignDoctor}>Assign</button>
              <button onClick={closeAssignDoctorModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAllAppointments;
