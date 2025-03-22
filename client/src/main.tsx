import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BasicExample from "./accordion";
import TypesExample from "./button";
import 'bootstrap/dist/css/bootstrap.min.css';
import CloseButtonExample from "./close_button";
import DropdownExample from "./dropdown";
import CardExample from "./placeholder";
import ProgressBarExample from "./progress";
import SpinnerExample from "./spinner";
import TableExample from "./table";
import TabsExample from "./tabs";
import ToastExample from "./toasts";
import Home from "./Home";
import SignUp from "./signup";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode
	>
    <Home/>
		<BasicExample/>
		<TypesExample/>
		<CloseButtonExample />
		<DropdownExample />
		<CardExample />
		<ProgressBarExample />
		<SpinnerExample />
		<TableExample />
		<TabsExample />
		<ToastExample />
		<SignUp/>
  </React.StrictMode>
);
