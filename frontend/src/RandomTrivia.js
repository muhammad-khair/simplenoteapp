import React, { useState } from "react";

function RandomTrivia() {
    const [trivia, setTrivia] = useState("TODO: add serverless data here");

    // TODO: pull serverless information to this placeholder

    return (
        <div>
            <h2>Trivia for the day!</h2>
            <h3>"{trivia}"</h3>
        </div>
    )
}

export default RandomTrivia;
