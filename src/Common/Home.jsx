
import Card from "./Card";
import Footer from '../Common/Footer'
import { useEffect,useState } from "react";
import Swal from "sweetalert2";
const Home=()=>{
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
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
    return(<>
    <div className="about-wrap">
        <div className="about-left-side">
            <h2 className="h2">Hospital Management Systems</h2>
 <div className="content-wrap">
    <h1 className="heading"> Now take the Appointments by Sitting at Home,</h1>
    <div>
        <h1 className="min-heading">Heathcare for your</h1>
        <h1 className="min-heading">Family`s Health</h1>
    </div>
 </div>
 <h6 className="sub-heading">
    Get Treatment Done from Our Specialist
 </h6>
        </div>
        <div className="about-right">
            <h1>Save Your Time</h1>


        </div>
    </div>
    
    <div class="card-container">
    <Card doctors={doctors}/>
 
    
    
    </div>
    <Footer/>
    </>)
}
export default Home;