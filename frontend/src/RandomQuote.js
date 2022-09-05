import React, { useState } from "react";

function RandomQuote() {
    const [quote, setQuote] = useState("Random quote here");

    // TODO: pull serverless information to this placeholder

    return (
        <div>
            <h2>Quote for the day!</h2>
            <h3>"{quote}"</h3>
        </div>
    )
}

export default RandomQuote;
