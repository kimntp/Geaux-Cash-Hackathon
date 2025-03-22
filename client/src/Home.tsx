import React from 'react'
import { useEffect, useState } from "react";
import "./Home.module.css";


const brand_logo =
  "/images/logo.png";

export default function Home() {
  return (
    <div className= "navBar">
      <p>Home </p>
      <img src= {brand_logo} className = "logo"
    alt="logo icon"/>
    </div>
  )
}
