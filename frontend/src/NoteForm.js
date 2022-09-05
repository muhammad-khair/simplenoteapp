import axios from "axios";
import React, { useState } from "react";

function NoteForm({ reloader }) {
    const [state, setState] = useState({
        description: "",
        tagsRaw: "",
        tags: [],
        priority: "LOW",
        is_flagged: false
    });
    
    const handleChange = (event) => {
        if (event.target.name === "is_flagged") {
            setState(prevState => {
                let newState = Object.assign({}, prevState);
                newState.is_flagged = !(prevState.is_flagged);
                return newState;
            });    
            return;
        }
        
        setState(prevState => {
            let newState = Object.assign({}, prevState);
            newState[event.target.name] = event.target.value;
            return newState;
        });

        if (event.target.name === "tagsRaw") {
            setState(prevState => {
                let newState = Object.assign({}, prevState);
                newState.tags = state.tagsRaw.split(/[, ]+/)
                    .map(s => s.trim())
                    .filter(s => !(!s));
                return newState;
            });
        }
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!state.description) {
            alert("Description must be filled!");
            return;
        }
        axios.post("http://localhost:8080/api/note", {
            description: state.description,
            tags: state.tags,
            priority: state.priority,
            is_flagged: state.is_flagged,
        })
        .then((response) => {
            alert('Added note!');
            reloader();
        });

        setState({
            description: "",
            tagsRaw: "",
            tags: [],
            priority: "LOW",
            is_flagged: false
        });
    }

    return (
        <div>
            <h2>New Note</h2>
            <form onSubmit={handleSubmit}>
            <div>
                Description: 
                <input type="text" name="description" value={state.description} onChange={handleChange}/>
            </div>
            <div>
                Flag it? 
                <input type="checkbox" name="is_flagged" checked={state.is_flagged} onChange={handleChange}/>
            </div>
            <div>
                Tags: 
                <input type="text" name="tagsRaw" value={state.tagsRaw} onChange={handleChange}/>
            </div>
            <div>
                <label>
                    Priority: 
                    <select name="priority" value={state.priority} onChange={handleChange}>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </label>
            </div>
            <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default NoteForm;
