import './EditNoteForm.css';
import axios from "axios";
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import BASE_URL from './BaseUrl';
import { Button } from 'react-bootstrap';

function EditNoteForm({id, data, reloader, closer}) {
    const [note, setNote] = useState({
        id: id,
        description: data.description,
        tagsRaw: data.tags.join(),
        tags: data.tags,
        priority: data.priority,
        is_flagged: data.is_flagged,
        is_completed: data.is_completed
    });
        
    const handleChange = (event) => {
        if (event.target.name === "is_flagged" || event.target.name === "is_completed") {
            setNote(prevState => {
                let newState = Object.assign({}, prevState);
                newState[event.target.name] = !(newState[event.target.name]);
                return newState;
            });    
            return;
        }
        
        setNote(prevState => {
            let newState = Object.assign({}, prevState);
            newState[event.target.name] = event.target.value;
            return newState;
        });

        if (event.target.name === "tagsRaw") {
            setNote(prevState => {
                let newState = Object.assign({}, prevState);
                newState.tags = note.tagsRaw.split(/[, ]+/)
                    .map(s => s.trim())
                    .filter(s => !(!s));
                return newState;
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!(note.description.trim())) {
            alert("Description must be filled!");
            return;
        }

        let data = {
            description: note.description,
            tags: note.tags,
            priority: note.priority,
            is_flagged: note.is_flagged,
            is_completed: note.is_completed
        };
        console.log(data);
        axios.put(`${BASE_URL}/${id}`, data)
			.then((res) => {
                reloader();
                closer();
            });
    }

    return (
        <div className='popup'>
            <div className='popup_inner'>
                <div className="d-flex justify-content-end">
                    <Button variant="dark" className="float-right mb-3" onClick={closer}>Close</Button>
                </div>
                <h2>Edit Note</h2>
                <Form>
                <Form.Group className="mb-3">
                <Form.Label>Description: </Form.Label><br/>
                    <input type="text" name="description" value={note.description} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label className="me-2">Is completed? </Form.Label>
                    <input type="checkbox" name="is_completed" checked={note.is_completed} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label className="me-2">Flag it? </Form.Label>
                    <input type="checkbox" name="is_flagged" checked={note.is_flagged} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Tags: </Form.Label><br/>
                    <input type="text" name="tagsRaw" value={note.tagsRaw} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="me-2">Priority:</Form.Label>
                    <select name="priority" value={note.priority} onChange={handleChange}>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </Form.Group>
                <Button variant="warning" type="submit" value="Submit" onClick={handleSubmit}>Submit</Button>
                </Form>
            </div>
        </div>
    );
}

export default EditNoteForm;
