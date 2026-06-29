import React, { useState} from "react";
import axios from "axios";
import CustomerHome from "./CustomerHome";
import "./CustomerLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function CustomerLogin() {
  const [cuid, setCuid] = useState("");
  const [cupass, setCupass] = useState("");  
  const [customer, setCustomer] = useState(null);  
  const [showPass, setShowPass] = useState(false);
  const REACT_APP_BASE_API_URL=process.env.REACT_APP_BASE_API_URL;  
  
  const handleLogin = async () => {
  try {
   
  const res =await axios.post(`${REACT_APP_BASE_API_URL}/customer/login`, {
  CUserId: cuid,
  CUserPass: cupass,
});

    if (res.data && res.data.CUserId) {
      if (res.data.Status === "Inactive") {
        alert("User not active. Please wait for admin activation.");
        return;
      }
      setCustomer(res.data);
    } else {
      alert("Invalid login");
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Login failed");
  }
};
  const handleLogout = () => {
    setCustomer(null);
  };
  if (customer) {
    return <CustomerHome customer={customer} onLogout={handleLogout} />;
  }
  return (
    <div className="customerlogin-container">
      <div className="customerlogin-form">
        <h4 className="customerlogin-title">Customer Login</h4>
        <input
          type="text"
          placeholder="Customer User ID"
          value={cuid}
          onChange={(e) => setCuid(e.target.value)}
        />
        <div className="password-field">
  <input
    type={showPass ? "text" : "password"}
    placeholder="Password"
    value={cupass}
    onChange={(e) => setCupass(e.target.value)}
  />
    <span
    className="eye-icon"
    onClick={() => setShowPass(!showPass)}
  >
    {showPass ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>   
        <button className="customerlogin-button" onClick={handleLogin}>
          Login
        </button>        
      </div>
    </div>
  );
}
export default CustomerLogin;
