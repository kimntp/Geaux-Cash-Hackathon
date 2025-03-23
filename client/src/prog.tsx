import React, { useState, useEffect } from "react";
import styles from "./prog.module.css";

const ProgPage: React.FC = () => {
    const [moneyGoal, setMoneyGoal] = useState<number>(0);
    const [targetDate, setTargetDate] = useState<string>('');
    const [dailySavings, setDailySavings] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0); // To track progress
    const [remainingAmount, setRemainingAmount] = useState<number>(0);
    const [daysRemaining, setDaysRemaining] = useState<number>(0);

    // Assuming the goal and date were sent as query params or from session state
    useEffect(() => {
        // Replace these with actual values, possibly from the backend or props.
        const savedGoal = 1000;  // Example goal, replace with actual data from backend
        const savedDate = "2025-05-01";  // Example target date, replace with actual
        setMoneyGoal(savedGoal);
        setTargetDate(savedDate);

        // Calculate the number of days remaining
        const today = new Date();
        const target = new Date(savedDate);
        const daysLeft = Math.ceil((target.getTime() - today.getTime()) / (1000 * 3600 * 24));
        setDaysRemaining(daysLeft);
        
        // Calculate how much is remaining to be saved
        const remaining = savedGoal - dailySavings * daysLeft;
        setRemainingAmount(remaining > 0 ? remaining : 0); // Ensure non-negative remaining amount

    }, [moneyGoal, targetDate, dailySavings]);

    const handleDailySavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dailyInput = parseFloat(e.target.value);
        setDailySavings(dailyInput);
        // Recalculate the progress and remaining amount
        const totalSaved = dailyInput * daysRemaining;
        setProgress((totalSaved / moneyGoal) * 100); // Calculate progress as a percentage
        setRemainingAmount(moneyGoal - totalSaved);
    };

    const generateChallengeIdeas = () => {
        return [
            "Skip that daily coffee purchase and save $5.",
            "Pack your lunch instead of eating out.",
            "Cut down on subscriptions you don't need.",
            "Consider walking or biking instead of driving to save on gas.",
            "Sell unused items around the house."
        ];
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Savings Progress</h1>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
                <label className={styles.progressLabel}>Progress:</label>
                <div className={styles.progressBarBackground}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                </div>
                <p className={styles.progressText}>{Math.round(progress)}% complete</p>
            </div>

            {/* Daily Savings Input */}
            <div className={styles.dailySavingsContainer}>
                <label className={styles.subtitle} htmlFor="dailySavings">How much can you save today?</label>
                <input
                    type="number"
                    id="dailySavings"
                    placeholder="Enter your daily savings amount"
                    onChange={handleDailySavingsChange}
                    className={styles.input}
                    value={dailySavings || ""}
                    min="0"
                />
            </div>

            {/* Daily Savings Challenge Ideas */}
            <div className={styles.challengeContainer}>
                <h3 className={styles.subtitle}>Daily Savings Challenge Ideas</h3>
                <ul>
                    {generateChallengeIdeas().map((idea, index) => (
                        <li key={index}>{idea}</li>
                    ))}
                </ul>
            </div>

            {/* Remaining Amount */}
            <div className={styles.remainingContainer}>
                <h3 className={styles.subtitle}>Remaining Amount: ${remainingAmount.toFixed(2)}</h3>
                <h4 className={styles.subtitle}>Days Remaining: {daysRemaining}</h4>
            </div>
        </div>
    );
};

export default ProgPage;
