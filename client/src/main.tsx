import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
/* import BasicExample from "./accordion";
import TypesExample from "./button";
import CloseButtonExample from "./close_button";
import DropdownExample from "./dropdown";
import CardExample from "./placeholder";
import ProgressBarExample from "./progress";
import SpinnerExample from "./spinner";
import TableExample from "./table";
import TabsExample from "./tabs";
import ToastExample from "./toasts"; */

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
	{/* /* everything below is for messing with other features */
		/* <BasicExample/>
		<TypesExample/>
		<CloseButtonExample />
		<DropdownExample />
		<CardExample />
		<ProgressBarExample />
		<SpinnerExample />
		<TableExample />
		<TabsExample />
/* 		<ToastExample /> *//* } */}
  </React.StrictMode>
);