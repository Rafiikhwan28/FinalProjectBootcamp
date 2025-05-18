import axios from "axios";
import { useState } from "react";
import './Register.css'
import Navbar from "../../component/Navbar";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
    profilePictureUrl: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      role: parseInt(form.role),
    };

    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register", payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar/>
      <div className="register-container">
      <div className="register-form">
        <h1 className="logo">Registrasi</h1>
        <input
          className="input-field"
          type="text"
          value={form.name}
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="input-field"
          type="text"
          value={form.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="input-field"
          type="password"
          value={form.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          className="input-field"
          type="password"
          value={form.passwordRepeat}
          name="passwordRepeat"
          onChange={handleChange}
          placeholder="Repeat Password"
        />
        <input
          className="input-field"
          type="text"
          value={form.role}
          name="role"
          onChange={handleChange}
          placeholder="Role"
        />
        <input
          className="input-field"
          type="text"
          value={form.profilePictureUrl}
          name="profilePictureUrl"
          onChange={handleChange}
          placeholder="Profile Picture URL"
        />
        <input
          className="input-field"
          type="text"
          value={form.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <button className="submit-button" onClick={handleSubmit}>Register</button>
      </div>
    </div>
    </div>
    
  );
};

export default Register;
