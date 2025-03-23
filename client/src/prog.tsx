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

  const [savingsEntries, setSavingsEntries] = useState<number[]>([]);

  const [newEntry, setNewEntry] = useState<string>("");

  const [progress, setProgress] = useState<number>(0);

  const [remainingAmount, setRemainingAmount] = useState<number>(1000);

 

  // Calculate total savings from all entries

  const totalSavings = savingsEntries.reduce((sum, entry) => sum + entry, 0);

 

  // Initialize state from localStorage

  useEffect(() => {

    const savedGoal = Number(localStorage.getItem('moneyGoal')) || 1000;

    const savedEntries = JSON.parse(localStorage.getItem('savingsEntries') || '[]');

  

    setMoneyGoal(savedGoal);

    setSavingsEntries(savedEntries);

  }, []);

 

  // Update progress and localStorage when entries change

  useEffect(() => {

    const newProgress = (totalSavings / moneyGoal) * 100;

    const newRemaining = moneyGoal - totalSavings;

 

    setProgress(Math.min(newProgress, 100));

    setRemainingAmount(Math.max(newRemaining, 0));

  

    localStorage.setItem('savingsEntries', JSON.stringify(savingsEntries));

  }, [savingsEntries, moneyGoal, totalSavings]);

 

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const value = parseFloat(newEntry);

  

    if (!isNaN(value) && value > 0) {

      setSavingsEntries(prev => [...prev, value]);

      setNewEntry("");

    }

  };

 

  return (

    <div className={styles.container}>

      <h1 className={styles.title}>Your Sad Excuse for Savings Progress</h1>

 

      {/* Progress Bar */}

      <div className={styles.progressContainer}>

        <label className={styles.progressLabel}>Progress... I guess.</label>

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

 

      {/* Savings Input Form */}

      <form onSubmit={handleSubmit} className={styles.dailySavingsContainer}>

        <label className={styles.subtitle} htmlFor="dailySavings">

          Add pathetic savings amount:

        </label>

        <input

          type="number"

          id="dailySavings"

          placeholder="Enter amount and press Enter"

          onChange={(e) => setNewEntry(e.target.value)}

          className={styles.input}

          value={newEntry}

          min="0.01"

          step="0.01"

          required

        />

        <button type="submit" style={{ display: 'none' }}>Add</button>

      </form>

 

 

 

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
