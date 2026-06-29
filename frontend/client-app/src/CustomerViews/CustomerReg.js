//81/06/26
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
//import "./CustomerReg.css";

function CustomerReg() {
  const API = process.env.REACT_APP_BASE_API_URL;

  const [cuserid, setCUserId] = useState("");
  const [cuserpass, setCUserPass] = useState("");
  const [crepass, setCRePass] = useState("");

  const [customername, setCustomerName] = useState("");
  const [caddress, setCAddress] = useState("");
  const [ccontact, setCContact] = useState("");
  const [cemail, setCEmail] = useState("");

  const [cstid, setCStId] = useState("");
  const [cctid, setCCtId] = useState("");

  const [cid, setCid] = useState(1);

  const [stlist, setStList] = useState([]);
  const [ctlist, setCtList] = useState([]);

  const [customerList, setCustomerList] = useState([]);

  const [image, setImage] = useState({
    preview: "",
    data: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadStates();
    fetchCustomerList();
  }, []);

  const loadStates = async () => {
    try {
      const res = await axios.get(`${API}/state/show`);
      setStList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCities = async (stid) => {
    try {
      const res = await axios.get(`${API}/city/showcitybystate/${stid}`);
      setCtList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCustomerList = async () => {
    try {
      const res = await axios.get(`${API}/customer/getcustomercount`);

      setCustomerList(res.data);
      setCid(res.data.length + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const validateForm = () => {
    let temp = {};
    let valid = true;

    if (!cuserid || cuserid.length < 4) {
      temp.cuserid = "User Id must be at least 4 characters";
      valid = false;
    } else if (
      customerList.some((c) => c.CUserId?.toLowerCase() === cuserid.toLowerCase())
    ) {
      temp.cuserid = "User Id already exists";
      valid = false;
    }

    if (!cuserpass || cuserpass.length < 6) {
      temp.cuserpass = "Password must be at least 6 characters";
      valid = false;
    }

    if (crepass !== cuserpass) {
      temp.crepass = "Passwords do not match";
      valid = false;
    }

    if (!customername.match(/^[A-Za-z ]+$/)) {
      temp.customername = "Customer name should contain only letters";
      valid = false;
    }

    if (!caddress) {
      temp.caddress = "Address is required";
      valid = false;
    }

    if (!cstid) {
      temp.cstid = "Please select state";
      valid = false;
    }

    if (!cctid) {
      temp.cctid = "Please select city";
      valid = false;
    }

    if (!/^\d{10}$/.test(ccontact)) {
      temp.ccontact = "Contact number must be 10 digits";
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(cemail)) {
      temp.cemail = "Enter valid email";
      valid = false;
    } else if (
      customerList.some(
        (c) => c.CEmail?.toLowerCase() === cemail.toLowerCase()
      )
    ) {
      temp.cemail = "Email already exists";
      valid = false;
    }

    if (!image.data) {
      temp.image = "Please upload photo";
      valid = false;
    }

    setErrors(temp);

    return valid;
  };

  const handleRegisterButton = async () => {
    if (!validateForm()) return;

    try {
      const customerObj = {
        CUserId: cuserid,
        CUserPass: cuserpass,
        CustomerName: customername,
        CAddress: caddress,
        CStId: Number(cstid),
        CCtId: Number(cctid),
        CContact: ccontact,
        CEmail: cemail,
        CPicName: "",
        Cid: cid,
        Status: "Inactive",
      };

      await axios.post(`${API}/customer/register`, customerObj);

      const formData = new FormData();

      formData.append("file", image.data);
      formData.append("CustomerName", customername);
      formData.append("CAddress", caddress);
      formData.append("CStId", cstid);
      formData.append("CCtId", cctid);
      formData.append("CContact", ccontact);
      formData.append("CEmail", cemail);

      await axios.put(
        `${API}/customer/update/${cuserid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Customer Registered Successfully");

      setStatus("Registration Successful");

      setCUserId("");
      setCUserPass("");
      setCRePass("");
      setCustomerName("");
      setCAddress("");
      setCContact("");
      setCEmail("");
      setCStId("");
      setCCtId("");
      setImage({ preview: "", data: "" });

      fetchCustomerList();
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setImage(img);
  };

  return (
    <div className="venderreg-container">
      <div className="venderreg-form">
        <h2>Customer Registration</h2>

        <p className="status">{status}</p>

        <div className="form-group">
          <label>Customer ID</label>
          <span className="readonly">{cid}</span>
        </div>

        <div className="form-group">
          <label>User Id</label>
          <input
            type="text"
            value={cuserid}
            onChange={(e) => setCUserId(e.target.value)}
          />
          <span className="error">{errors.cuserid}</span>
        </div>

        <div className="form-group password-field">
          <label>Password</label>

          <div className="input-with-icon">
            <input
              type={showPass ? "text" : "password"}
              value={cuserpass}
              onChange={(e) => setCUserPass(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <span className="error">{errors.cuserpass}</span>
        </div>

        <div className="form-group password-field">
          <label>Re-enter Password</label>

          <div className="input-with-icon">
            <input
              type={showRePass ? "text" : "password"}
              value={crepass}
              onChange={(e) => setCRePass(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={() => setShowRePass(!showRePass)}
            >
              {showRePass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <span className="error">{errors.crepass}</span>
        </div>

        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            value={customername}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <span className="error">{errors.customername}</span>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            value={caddress}
            onChange={(e) => setCAddress(e.target.value)}
          />
          <span className="error">{errors.caddress}</span>
        </div>

        <div className="form-group">
          <label>State</label>

          <select
            value={cstid}
            onChange={(e) => {
              setCStId(e.target.value);
              loadCities(e.target.value);
            }}
          >
            <option value="">Select State</option>

            {stlist.map((row) => (
              <option key={row.stid} value={row.stid}>
                {row.stname}
              </option>
            ))}
          </select>

          <span className="error">{errors.cstid}</span>
        </div>

        <div className="form-group">
          <label>City</label>

          <select
            value={cctid}
            onChange={(e) => setCCtId(e.target.value)}
          >
            <option value="">Select City</option>

            {ctlist.map((row) => (
              <option key={row.ctid} value={row.ctid}>
                {row.ctname}
              </option>
            ))}
          </select>

          <span className="error">{errors.cctid}</span>
        </div>

        <div className="form-group">
          <label>Contact</label>

          <input
            type="text"
            maxLength="10"
            value={ccontact}
            onChange={(e) =>
              setCContact(e.target.value.replace(/\D/g, ""))
            }
          />

          <span className="error">{errors.ccontact}</span>
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={cemail}
            onChange={(e) => setCEmail(e.target.value)}
          />

          <span className="error">{errors.cemail}</span>
        </div>

        <div className="form-group">
          <label>Upload Photo</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {image.preview && (
            <img
              src={image.preview}
              alt="Preview"
              className="preview"
            />
          )}

          <span className="error">{errors.image}</span>
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary"
            onClick={handleRegisterButton}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerReg;