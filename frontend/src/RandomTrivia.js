import React, { useState } from "react";
import Card from 'react-bootstrap/Card';

function RandomTrivia() {
    const [trivia, setTrivia] = useState("TODO: add serverless data here");

    // TODO: pull serverless information to this placeholder

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
