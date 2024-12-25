import { useState } from "react";
import Swal from "sweetalert2";

const Signup = ({setIsLogin}) => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    try {
      const response = await fetch("https://a88d77aa-a982-40cf-a824-793ca09ab8fe-00-3tb0mtjbf8juf.sisko.replit.dev/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending formData as JSON
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setSuccess(result.message);
      setIsLogin(true)
      Swal.fire({
        title: "Success!",
        text: result.message,
        icon: "success",
        confirmButtonText: "OK",
      });
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
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
        </div>

        <div className="btn-wrap">
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
   
  );
};

export default Signup;
