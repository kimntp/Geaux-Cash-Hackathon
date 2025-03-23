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

		const handleSubmit = async (event: React.FormEvent) => {
			event.preventDefault();

			// Do a POST request on our binded port.
    	const response = await fetch('http://localhost:3000/money_goal_and_date', {
				method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
				// We want to send some JSON.
        body: JSON.stringify({ money_goal: textAnswer, date: dateAnswer }),
    	});
    		const data = await response.text();
				console.log(data);
        console.log('[BACKEND]: Money client is lying about saving: '+ textAnswer);
        console.log('[BACKEND]: Date Client is lying about holding themselves to: '+ dateAnswer);
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
												id="textQuestion"
                        placeholder='$0'
                        value={textAnswer.replace('$', '')}
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
