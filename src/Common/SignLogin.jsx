import { useState } from "react";
import Signup from "./Signup"; 
import Login from "./login";  

const SignLogin = () => {
  const [isLogin, setIsLogin] = useState(true); 

  return (
    <div className="wrap-loginSignup">
    <div className="form-wrap-loginSigup">
      <h2>{isLogin ? "Login" : "Update Password"}</h2>
      {isLogin ? <Login /> : <Signup  setIsLogin={setIsLogin}/>}

      {isLogin ? <small>Forgot Password click here?   <a  href="#" onClick={() => setIsLogin(!isLogin)}>update</a></small>:
      
      
      <small>
      Already have an account? <a href="#" onClick={() => setIsLogin(!isLogin)}>Login</a>
      </small>
}
</div> </div>
  );
};

export default SignLogin;
