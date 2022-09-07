import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { SERVERLESS_URL } from './UrlPaths';
import axios from "axios";

function ServerlessRates() {
    const [rates, setRates] = useState({});

    const loadRates = () => {
		axios.get(SERVERLESS_URL)
			.then((res) => {
				setRates(res.data.rates);
			});
  	};
    useEffect(() => loadRates(), []);

    return (
        <Card className="m-auto align-self-center p-3 mb-2 bg-secondary text-white" style={{ width: '25rem' }}>
            <Card.Body>
                <Card.Title>
                    Serverless rates for the day!
                </Card.Title>
                <Card.Text>
                    {
                        Object.entries(rates).map(([k, v]) => 
                            <li>{k}: {v}</li>
                        )
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ServerlessRates;
