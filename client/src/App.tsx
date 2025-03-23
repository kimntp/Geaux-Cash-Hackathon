import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SignUp from "./signup";
import QuestPage from "./quest";
import Prog from "./prog";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/quest" element={<QuestPage />} />
      { <Route path="/prog" element={<Prog />} /> }
    </Routes>
  );
};

export default App;
