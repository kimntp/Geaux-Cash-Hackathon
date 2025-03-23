import React from 'react'
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const brand_logo =
  "/images/spendemiclogo.png";
  

export default function Home() {

  return (
    <div className={styles.container} id ="begin">
      
      <img src= {brand_logo} className ={styles.logo}
    alt="logo icon"/>
     <h2 className={styles.mainText}>Let's get this over with.</h2>
  <h3 className={styles.subText}>You clearly need help managing your money.</h3>
  <a href="/signup">
  <Button variant="dark" className={styles.button}>
      Control Yourself
    </Button>
    </a>
    </div>
  )
}
