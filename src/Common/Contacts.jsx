import Footer from "./Footer";
const Contacts = () => {
    return (
      <>
     
        <div className="contacts-container">
          
       
       
          <div className="form-container">
          <h1>Get In Touch</h1>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Name"
                  name="Name"
                />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Phone Number"
                  name="Phone Number"
                />
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  name="Email"
                />
                <textarea
                  className="textarea-field"
                  placeholder="Message"
                  rows="5"
                  id="comment"
                  name="Message"
                ></textarea>
               
              </div>
            </form>
            <button type="submit" className="send-button">
                  SEND
                </button>
          </div>
          <div className="map-container">
            <div className="map-responsive">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6804.09006470827!2d73.07382!3d31.495446!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392241fab14bf1fd%3A0x497d9b02ce190384!2sMadinah%20Teaching%20Hospital!5e0!3m2!1sen!2sus!4v1731788583766!5m2!1sen!2sus" width="600" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          </div>
          <Footer/>
     
      </>
    );
  };
  
  export default Contacts;
  