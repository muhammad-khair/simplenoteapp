const { validationResult } = require('express-validator');
const { createNewNote, updateNote } = require("./noteService");
let Note = require("./noteModel");

exports.index = function (req, res) {
    console.log("Loading notes");
    Note.get((err, notes) => {
        if (err) {
            console.warn("Unable to load notes");
            res.statusCode = 500;
            return res.json(err);
        }
        return res.json({
            data: notes,
        });
    });
};

exports.new = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.warn(`Error parsing: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({
            errors: errors.array()
        });
    }
    console.log("Creating new note");
    var note = createNewNote(req.body);
    note.save((err) => {
        if (err) {
            console.warn(`Unable to save note ${note}`);
            res.statusCode = 400;
            return res.json({ message: err.message, });
        }
        console.log(`New note ${note} created`);
        return res.json({
            data: note
        });
    });
};

exports.view = function (req, res) {
    console.log(`Loading note ${req.params.note_id}`);
    Note.findById(req.params.note_id, (err, note) => {
        if (err) {
            console.warn(`Unable to load note ${req.params.note_id}`);
            res.statusCode = 500;
            return res.send(err);
        };
        if (!note) {
            console.warn(`Note ${req.params.note_id} does not exist`);
            res.statusCode = 400;
            return res.json({
                message: "Note does not exist.",
            });
        }
        return res.json({
            data: note,
        });
    });
};

exports.update = function (req, res) {
    console.log(`Updating note ${req.params.note_id}`);
    Note.findById(req.params.note_id, (err, note) => {
        if (err) {
            console.warn(`Unable to load note ${req.params.note_id}`);
            return res.send(err);
        };
        if (!note) {
            console.warn(`Note ${req.params.note_id} does not exist`);
            res.statusCode = 400;
            return res.json({
                message: "Note does not exist.",
            });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.warn(`Error parsing: ${JSON.stringify(errors.array())}`);
            return res.status(400).json({
                errors: errors.array()
            });
        }
        updateNote(note, req.body);
        note.save((err) => {
            if (err) {
                console.warn(`Unable to save note ${note}`);
                res.statusCode = 400;
                return res.json({ message: err.message, });
            }
            return res.json({
                data: note,
            });
        });
    });
};

exports.delete = function (req, res) {
    console.log(`Deleting note ${req.params.note_id}`);
    Note.deleteOne({_id: req.params.note_id,}, (err) => {
        if (err) {
            console.warn(`Unable to load note ${req.params.note_id}`);
            res.statusCode = 500;
            return res.send(err);
        };
        return res.json({
            note_id: req.params.note_id,
        });
    });
};

exports.clear = function (req, res) {
    console.log("Clearing all notes");
    Note.deleteMany((err) => {
        if (err) {
            console.warn("Delete to load notes");
            res.statusCode = 500;
            return res.send(err);
        };
        return res.send();
    });
};
