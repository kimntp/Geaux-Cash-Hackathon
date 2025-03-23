import React, { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match! Please try again.");
        return;
    }

		// Do a POST request on our binded port.
    const response = await fetch('http://localhost:3000/signup', {
				method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
				// We want to send some JSON.
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email, password: password }),
    });
    const data = await response.text();
    console.log("[BACKEND]: " + data); // Handle the response from the server
    if (response.ok) {
      navigate("/quest"); // Navigate ONLY if request is successful
    } else {
      alert("Signup failed. Please try again.");
    }
	};

	return (
    <div className={styles.container} id ="signup">
      <h1 className={styles.title}>Let’s get this over with.</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
         <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
        />
        <button type="submit" className={styles.button} onClick={() => navigate("/quest")}>Sign Up</button>
      </form>
    </div>
  );
}
export default SignUp;
