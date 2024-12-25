
import logo from "../assats/logo.webp"
const Card=({doctors})=>{
    return(<>
   { doctors.map((doctor) => (
    
    <div class="card">
    <img src={logo} alt="Doctor's Image" class="card-image"/>
    <div class="card-content">
        <h3 class="doctor-name">{doctor.fname}  {doctor.lname}</h3>
        <p class="doctor-specialty">{doctor.specialist}</p>
        <p class="doctor-age">Age: {doctor.age}</p>
        <p class="doctor-experience">Experience: {doctor.experience} years</p>
       
    </div>
</div>
  ) )}
    
    </>)
}
export default Card