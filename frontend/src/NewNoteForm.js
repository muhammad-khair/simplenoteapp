import axios from "axios";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BASE_URL } from './UrlPaths';

function NewNoteForm({ reloader }) {
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
        if (!(state.description.trim())) {
            alert("Description must be filled!");
            return;
        }
        axios.post(BASE_URL, {
            description: state.description,
            tags: state.tags,
            priority: state.priority,
            is_flagged: state.is_flagged,
        })
        .then((response) => {
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
        <Form className="square border border-primary m-auto align-self-center p-3 mb-2 bg-light text-dark" style={{ width: '30rem' }}>
            <h2>New Note</h2>
            <Form.Group className="mb-3" >
            <Form.Label>Description:</Form.Label><br/>
                <input type="text" name="description" value={state.description} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" >
            <Form.Label className="me-2">Flag it?</Form.Label>
                <input type="checkbox" name="is_flagged" checked={state.is_flagged} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" >
            <Form.Label>Tags:</Form.Label><br/>
                <input type="text" name="tagsRaw" value={state.tagsRaw} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="me-2">Priority:</Form.Label>
                    <select name="priority" value={state.priority} onChange={handleChange}>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
            </Form.Group>
            <Button variant="primary" type="submit" value="Submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    );
}

export default NewNoteForm;
