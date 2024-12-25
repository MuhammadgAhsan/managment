import { useState } from "react";
import Swal from 'sweetalert2';

const DocotorRegister = () => {

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    password: "",
    bgroup: "",
    age: "",
    city: "",
    specialist:"",
    experience:"",
    role: "Doctor",
  });
  
  const [loading, setLoading] = useState(false); 
  const [errorMsg, setErrorMessage] = useState({}); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    setErrorMessage((prev) => ({
      ...prev,
      [name]: value ? "" : "This field is required",
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
 
    let validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) { 
        validationErrors[key] = "This field is required";
      }
    });
    console.log(formData,"fdlksldkld2222")
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      setLoading(false);

  

      return; }
      console.log(formData,"fdlksldkld 333")

    try {
    
      const response = await fetch("https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

   
      setSuccess(result.message); 
      setFormData({})
     
      Swal.fire({
        title: 'Success!',
        text: result.message,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      setError(error.message); 
   
     
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className={`form-wrap`}>
        <div className="heading">
          <h1>Register Doctor</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-left">
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="fname"
                value={formData.fname || ""}
                onChange={handleChange}
              />
              {errorMsg.fname && <span className="error">{errorMsg.fname}</span>}
            </div>

            <div>
              <label>Email Id</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
              {errorMsg.email && <span className="error">{errorMsg.email}</span>}
            </div>

            <div>
              <label>User Gender</label>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              {errorMsg.gender && <span className="error">{errorMsg.gender}</span>}
            </div>
          
            <div>
              <label>Specialist:</label>
              <input
                type="text"
                name="specialist"
                value={formData.specialist || ""}
                onChange={handleChange}
              />
              {errorMsg.specialist && <span className="error">{errorMsg.specialist}</span>}
            </div>
            <div>
              <label> Experience:</label>
              <input
                type="text"
                name="experience"
                value={formData.experience || ""}
                onChange={handleChange}
              />
              {errorMsg.experience && <span className="error">{errorMsg.experience}</span>}
            </div>
            <div>
              <label>Contact No:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
              {errorMsg.phone && <span className="error">{errorMsg.phone}</span>}
            </div>

            <div>
              <label>Street</label>
              <textarea
                rows={5}
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              ></textarea>
              {errorMsg.address && <span className="error">{errorMsg.address}</span>}
            </div>
          </div>

          <div className="form-right">
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lname"
                value={formData.lname || ""}
                onChange={handleChange}
              />
              {errorMsg.lname && <span className="error">{errorMsg.lname}</span>}
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
              />
              {errorMsg.password && <span className="error">{errorMsg.password}</span>}
            </div>

            <div>
              <label>Blood Group</label>
              <input
                type="text"
                name="bgroup"
                value={formData.bgroup || ""}
                onChange={handleChange}
              />
              {errorMsg.bgroup && <span className="error">{errorMsg.bgroup}</span>}
            </div>

            <div>
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
              />
              {errorMsg.age && <span className="error">{errorMsg.age}</span>}
            </div>

            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
              />
              {errorMsg.city && <span className="error">{errorMsg.city}</span>}
            </div>
          </div>
        </form>

        <div className="btn-wrap">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </>
  );
};



export default DocotorRegister;
