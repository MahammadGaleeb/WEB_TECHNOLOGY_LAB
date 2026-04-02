import React, { useState } from "react";

function FormValidation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email";

    if (!form.password) err.password = "Password is required";

    return err;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Form submitted successfully!");
      setForm({ name: "", email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <div>
      <h2>Form Validation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.name}</p>

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.email}</p>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.password}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormValidation;