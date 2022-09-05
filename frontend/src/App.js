import './App.css';
import React from "react";
import Table from "./Table";
import NoteForm from "./NoteForm";

function App() {
	return (
		<div className="App">
			<NoteForm/>
			<Table/>
		</div>
	);
}

export default App;
