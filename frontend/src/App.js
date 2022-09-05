import './App.css';
import axios from "axios";
import React, { useState } from "react";
import Table from "./Table";
import NoteForm from "./NoteForm";
import RandomQuote from "./RandomQuote";

function App() {
  const [data, setData] = useState([]);

  const loadData = () => {
		let dataUrl = "http://localhost:8080/api/note";
		axios.get(dataUrl)
			.then((res) => {
				setData(res.data.data);
			});
  }

	return (
		<div className="App">
			<h1>Welcome to simplenoteapp!</h1>
			<div><RandomQuote/></div>
			<div><NoteForm reloader={loadData}/></div>
			<div><Table data={data} reloader={loadData}/></div>
		</div>
	);
}

export default App;
