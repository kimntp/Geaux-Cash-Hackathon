import React, { useState } from 'react';
import styles from "./signup.module.css";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Handle sign up logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div>
            <h2 className={styles.signup}>Let's get this over with.</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className={styles.email}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={styles.pass}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={styles.conpass}>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.signupbtn} type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;