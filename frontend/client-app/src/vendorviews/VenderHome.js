import React from "react";
import "./VenderHome.css";
import Product from "../ProductViews/Product";
import ReactDOM from "react-dom/client";

function VenderHome({ vender, onLogout }) {  
const root = ReactDOM.createRoot(document.getElementById('root'));
const handleProductButton=()=>{
  root.render(<Product data={vender.Vid}/>);
}
  return(
     <div>
      <h4>Welcome Vendor Home </h4>
      <h5>Vendor Id {vender.Vid}</h5>
      <h5>{vender.VenderName}</h5>
      <img src={vender.VPicName} height={100} width={100} style={{borderRadius:50}} alt="vendor pic" />
      <button type="submit" onClick={handleProductButton} style={{background:"green",color:"white"}}>Manage Product</button>
     </div>
  );
}
export default VenderHome;
