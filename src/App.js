import "./App.css";
import React, { useState } from "react";

function App() {
	const [zone, setZone] = useState("");
	const [size, setSize] = useState("");
	const [flood, setFlood] = useState(false);
	const [property, setProperty] = useState([]);
	const [showResults, setShowResults] = useState(false);

	function rules() {
		while (flood === false) {
			if (zone === "Zone 1" || zone === "Zone 2") {
				setProperty((property) => [
					...property,
					" Single dwelling house",
				]);
			}
			if ((zone === "Zone 2" || zone === "Zone 3") && size >= 500) {
				setProperty((property) => [...property, " Apartment complex"]);
			}
			if (zone === "Zone 3" && size >= 1000) {
				setProperty((property) => [
					...property,
					" Commercial building",
				]);
			}
			break;
		}
		if (flood === true) {
			setProperty((property) => [
				...property,
				"No housing types can be built in a flood area",
			]);
		}
	}

	const listItems = property.map((property) => <li>{property}</li>); //display property array as a list

	const onSubmit = () => {
		setProperty([]); //resets property array
		rules();
		setShowResults(true);
	};

	const Results = () => (
		<div>
			<hr></hr>
			<header className="header">Analysis Results</header>
			<p>Based on the property facts, the allowed building types are:</p>
			<b>{listItems}</b>
		</div>
	);

	const handleChange = (e) => {
		//checkbox functionality
		if (e.target.checked) {
			setFlood(true);
		} else {
			setFlood(false);
		}
	};

	return (
		<>
			<div className="main-div">
				<header className="header">Property Facts</header>
				<form className="form-div">
					<label className="label-div">
						<h3 className="label-header">Zone</h3>
						<input
							className="input-box"
							type="text"
							name="zone"
							value={zone}
							onChange={(e) => {
								setZone(e.target.value);
							}}
						/>
					</label>
					<label className="label-div">
						<h3 className="label-header">Size</h3>
						<input
							className="input-box"
							type="text"
							name="size"
							value={size}
							onChange={(e) => {
								setSize(e.target.value);
							}}
						/>
						<p className="size-note">Square meters</p>
					</label>
					<label>
						<h3 className="label-header">Is flooding area?</h3>
						<input
							className="box"
							type="checkbox"
							name="flood"
							value={flood}
							onChange={handleChange}
						/>
						<span className="checkbox-header">Flood area</span>
					</label>
				</form>
				<button type="button" onClick={onSubmit}>
					Submit
				</button>
				<div className="Results">
					{showResults ? <Results /> : null}
				</div>
			</div>
		</>
	);
}

export default App;
