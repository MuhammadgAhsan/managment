import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "",role:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorMsg, setErrorMessage] = useState({}); 

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage((prev) => ({
      ...prev,
      [name]: value ? "" : "This field is required",
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    let validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "role") { // Assuming "role" is optional
        validationErrors[key] = "This field is required";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      setLoading(false);

  

      return; }
  
    try {
      // Make the login API call
      const response = await fetch("https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/login", {
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
  
      // Successful login
      setSuccess(result.message);
      localStorage.setItem("userId", result.userId);  // Save userId in localStorage
  
      // Show success message
      Swal.fire({
        title: "Success!",
        text: result.message,
        icon: "success",
        confirmButtonText: "OK",
      });
  
      // Redirect based on user role
      if (result.role === "Admin") {
        navigate("/admin");
      } else if (result.role === "Doctor") {
        navigate("/doctor");
      } else if (result.role === "Patient") {
        navigate("/patient");
      }
  
    } catch (error) {
      setError(error.message);
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
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-left">
        <div>
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="btn-wrap">
          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
