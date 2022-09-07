import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios";
import React, { useState } from "react";
import NoteTable from "./NoteTable";
import NewNoteForm from "./NewNoteForm";
import ServerlessRates from "./ServerlessRates";
import { BASE_URL } from './UrlPaths';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  	const [data, setData] = useState([]);

  	const loadData = () => {
		axios.get(BASE_URL)
			.then((res) => {
				setData(res.data.data);
			});
  	};

	return (
		<div className="App">
			<Container>
				<br/>
				<Row>
					<Col><h1>Welcome to simplenoteapp!</h1></Col>
				</Row>
				<br/>
				<Row>
					<Col><NewNoteForm reloader={loadData}/></Col>
					<Col><ServerlessRates/></Col>
				</Row>
				<br/>
				<Row>
					<Col><NoteTable data={data} reloader={loadData}/></Col>
				</Row>
				<br/>
			</Container>
		</div>
	);
}

export default App;
