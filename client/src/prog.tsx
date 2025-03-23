import React, { useState, useEffect } from "react";
import styles from "./prog.module.css";

const CHALLENGE_IDEAS = [
  "Stop wasting $5 on liquid regret.",
  "Quit burning cash on takeout.",
  "Ditch the deadweight subscriptions.",
  "Walk, don’t whine about gas.",
  "Sell your junk, you're not a dragon."
];

const ProgPage: React.FC = () => {
  const [moneyGoal, setMoneyGoal] = useState<number>(1000);
  const [dailySavings, setDailySavings] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [remainingAmount, setRemainingAmount] = useState<number>(1000);

  // Initialize state from localStorage
  useEffect(() => {
    const savedGoal = Number(localStorage.getItem('moneyGoal')) || 1000;
    const savedDaily = Number(localStorage.getItem('dailySavings')) || 0;
   
    setMoneyGoal(savedGoal);
    setDailySavings(savedDaily);
    updateProgress(savedDaily, savedGoal);
  }, []);

  // Update localStorage when dailySavings changes
  useEffect(() => {
    localStorage.setItem('dailySavings', dailySavings.toString());
  }, [dailySavings]);

  const updateProgress = (currentSavings: number, goal: number) => {
    const newProgress = (currentSavings / goal) * 100;
    const newRemaining = goal - currentSavings;

    setProgress(Math.min(newProgress, 100));
    setRemainingAmount(Math.max(newRemaining, 0));
  };

  const handleDailySavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseFloat(e.target.value) || 0);
    setDailySavings(value);
    updateProgress(value, moneyGoal);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Savings Progress</h1>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <label className={styles.progressLabel}>Progress:</label>
        <div className={styles.progressBarBackground}>
          <div
            className={styles.progressBar}
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className={styles.progressText}>
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Daily Savings Input */}
      <div className={styles.dailySavingsContainer}>
        <label className={styles.subtitle} htmlFor="dailySavings">
          How much can you save today?
        </label>
        <input
          type="number"
          id="dailySavings"
          placeholder="Enter your daily savings amount"
          onChange={handleDailySavingsChange}
          className={styles.input}
          value={dailySavings}
          min="0"
          step="1"
        />
      </div>

      {/* Daily Savings Challenge Ideas */}
      <div className={styles.challengeContainer}>
        <h3 className={styles.subtitle}>Daily Savings Challenge Ideas</h3>
        <ul>
          {CHALLENGE_IDEAS.map((idea, index) => (
            <li key={index}>{idea}</li>
          ))}
        </ul>
      </div>

      {/* Remaining Amount */}
      <div className={styles.remainingContainer}>
        <h3 className={styles.subtitle}>
          {remainingAmount > 0 ? (
            `Remaining Amount: $${remainingAmount.toFixed(2)}`
          ) : (
            <span className={styles.successMessage}>Goal Achieved! 🎉</span>
          )}
        </h3>
      </div>
    </div>
  );
};

export default ProgPage;
