import './EditNoteForm.css';
import axios from "axios";
import React, { useState } from "react";

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

		let dataUrl = "http://localhost:8080/api/note";
        let data = {
            description: note.description,
            tags: note.tags,
            priority: note.priority,
            is_flagged: note.is_flagged,
            is_completed: note.is_completed
        };
        axios.put(`${dataUrl}/${id}`, data)
			.then((res) => {
                alert("Note updated!");
                reloader();
                closer();
            });
    }

    return (
        <div className='popup'>
            <div className='popup_inner'>
                <h2>Edit Note</h2>
                <form onSubmit={handleSubmit}>
                <div>
                    Description: 
                    <input type="text" name="description" value={note.description} onChange={handleChange}/>
                </div>
                <div>
                    Is completed? 
                    <input type="checkbox" name="is_completed" checked={note.is_completed} onChange={handleChange}/>
                </div>
                <div>
                    Flag it? 
                    <input type="checkbox" name="is_flagged" checked={note.is_flagged} onChange={handleChange}/>
                </div>
                <div>
                    Tags: 
                    <input type="text" name="tagsRaw" value={note.tagsRaw} onChange={handleChange}/>
                </div>
                <div>
                    <label>
                        Priority: 
                        <select name="priority" value={note.priority} onChange={handleChange}>
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </label>
                </div>
                <input type="submit" value="Submit" />
                </form>
                <div>
                    <br/><br/><br/>
                    <button onClick={closer}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default EditNoteForm;
