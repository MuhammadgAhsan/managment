import { Link } from "react-router-dom";

const Footer=()=>{

    return(<>
    <div className="footer-wrap">
        <div>
            <h1 className="footer_taital"><div className="round"></div> Address</h1>
            <div className="location_main">
                        <ul>
                           <li>
                              <a href="#"><i class="fa fa-map-marker" aria-hidden="true"></i>
                              <span class="padding_15">Making this the first true</span></a>
                           </li>
                           <li>
                              <a href="#"><i class="fa fa-phone" aria-hidden="true"></i>
                              <span class="padding_15">Call : ***********</span></a>
                           </li>
                           <li>
                              <a href="#"><i class="fa fa-envelope" aria-hidden="true"></i>
                              <span class="padding_15">Email : rehan@gmail.com</span></a>
                           </li>
                        </ul>
                     </div>

        </div>
        <div>
            <h1 className="footer_taital"><div className="round"></div>Useful Link</h1>
            <ul>
            <div className="location_main">
                        <ul>
                           <li>
                              <Link href="index.html">Home</Link>
                           </li>
                           <li class="active">
                              <a href="about.html">About</a>
                           </li>
                           <li>
                              <a href="doctors.html">Doctors</a>
                           </li>
                          
                           <li>
                              <a href="treatment.html">Treatment</a>
                           </li>
                           <li>
                              <a href="contact.html">Contact Us</a>
                           </li>
                        </ul>
                     </div>
            </ul>

        </div>
        <div>
            <h1 className="footer_taital"><div className="round"></div>Help & Support</h1>
            <p className="location_main_p">
            Opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page
            </p>

        </div>
    </div>
    </>)
}
export default Footer;