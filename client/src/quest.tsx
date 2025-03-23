import React, { useState } from 'react';
import styles from "./quest.module.css";

const QuestPage: React.FC = () => {
    const [textAnswer, setTextAnswer] = useState('');
    const [dateAnswer, setDateAnswer] = useState('');

    const brand_logo = "/images/logo.png";

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextAnswer(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateAnswer(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Text Answer:', textAnswer);
        console.log('Date Answer:', dateAnswer);
    };

    return (
        <div className={styles.container}>
            <img src= {brand_logo} 
            className ={styles.logo} 
            alt="logo icon"/>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label className={styles.subtitle} htmlFor="textQuestion">How much are you pretending to save this time?</label>
                    <input
                        type="text"
                        placeholder='$$$'
                        value={textAnswer}
                        onChange={handleTextChange}
                        className={styles.input}
                    />
                </div>
                <div>
                    <label className={styles.subtitle} htmlFor="dateQuestion">When do you want to get your shit together by?</label>
                    <input
                        type="date"
                        id="dateQuestion"
                        value={dateAnswer}
                        onChange={handleDateChange}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Submit</button>
            </form>
        </div>
    );
};

export default QuestPage;