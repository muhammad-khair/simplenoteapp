import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { SERVERLESS_URL } from './UrlPaths';
import axios from "axios";

function RandomTrivia() {
    const [trivia, setTrivia] = useState("TODO: add serverless data here");

    const loadTrivia = () => {
		axios.get(SERVERLESS_URL)
			.then((res) => {
				setTrivia(res.data);
			});
  	};
    useEffect(() => loadTrivia(), []);

    return (
        <Card className="m-auto align-self-center p-3 mb-2 bg-secondary text-white" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>
                    Trivia for the day!
                </Card.Title>
                <Card.Text>
                    "{trivia}"
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default RandomTrivia;
