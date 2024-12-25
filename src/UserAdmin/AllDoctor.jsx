import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors data
  useEffect(() => {
    fetch("https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/doctor")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setDoctors(data); // Populate doctors data
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, [loading]);

  // Handle delete action
  const handleDelete = (doctorId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion
        fetch(`https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/doctordel/${doctorId}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            setLoading(!loading)
            Swal.fire({
              title: "Deleted!",
              text: "The doctor record has been deleted.",
              icon: "success",
        
  showConfirmButton: false,
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <>
      <div className="table-wrap">
        <div className="table-heading">All Doctors</div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <table>
              <thead className="th-head">
                <tr>
                  <th>Doctor</th>
                  <th>Name</th>
                 
                  <th>Email ID</th>
                  <th>Specialist</th>
                  <th>Experience</th>
                  <th>Age</th>
                  <th>Phone No</th>
                  <th>City</th>
                  <th>Address</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>
                      <img
                        src={doctor.image || ""}
                        alt="Doctor"
                        className="doctor-img"
                      />
                    </td>
                    <td>{doctor.fname}  {doctor.lname}</td>
                    
                    <td>{doctor.email}</td>
                    <td>{doctor.specialist}</td>
                    <td>{doctor.experience}</td>
                    <td>{doctor.age}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.city}</td>
                    <td>{doctor.address}</td>
                   
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(doctor._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllDoctor;
