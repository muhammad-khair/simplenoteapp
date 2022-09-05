import './App.css';
import axios from "axios";
import React, { useState } from "react";
import Table from "./Table";
import NewNoteForm from "./NewNoteForm";
import RandomTrivia from "./RandomTrivia";

// TODO: add Bootstrap https://blog.logrocket.com/using-bootstrap-with-react-tutorial-with-examples/

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
			<div><RandomTrivia/></div>
			<div><NewNoteForm reloader={loadData}/></div>
			<div><Table data={data} reloader={loadData}/></div>
		</div>
	);
}

export default App;
