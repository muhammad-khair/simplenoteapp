import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios";
import React, { useState } from "react";
import NoteTable from "./NoteTable";
import NewNoteForm from "./NewNoteForm";
import RandomTrivia from "./RandomTrivia";
import { BASE_URL } from './UrlPaths';

function App() {
  	const [data, setData] = useState([]);

  	const loadData = () => {
		axios.get(BASE_URL)
			.then((res) => {
				setData(res.data.data);
			});
  	}

	return (
		<div className="App">
			<div>
				<br/><h1>Welcome to simplenoteapp!</h1>
			</div>
			<br/><div><RandomTrivia/></div>
			<br/><div><NewNoteForm reloader={loadData}/></div>
			<br/><div><NoteTable data={data} reloader={loadData}/></div>
		</div>
	);
}

export default App;
