let Note = require("./noteModel");

module.exports.createNewNote = function (dataSource) {
    var note = new Note();
    note.description = dataSource.description.trim();
    note.tags = [];
    console.log(dataSource.tags);
    if (dataSource.tags) {
        dataSource.tags.map((t) => String(t).trim()).forEach((t) => {
            console.log(t);
            if (t.length > 0) {
                note.tags.push(t);
            }
        });
    }
    note.priority = (dataSource.priority)
        ? dataSource.priority.trim()
        : "LOW";
    note.is_flagged = (dataSource.is_flagged)
        ? dataSource.is_flagged
        : false;
    return note;
};

module.exports.updateNote = function (note, dataSource) {
    note.description = (dataSource.description && dataSource.description.trim())
        ? dataSource.description.trim()
        : note.description;
    if (dataSource.tags) {
        note.tags = []
        dataSource.tags.map((t) => String(t).trim()).forEach((t) => {
            if (t.length > 0) {
                note.tags.push(t);
            }
        });
    }
    note.priority = (dataSource.priority)
        ? dataSource.priority.trim()
        : note.priority;
    note.is_flagged = (dataSource.is_flagged)
        ? dataSource.is_flagged
        : note.is_flagged;
    note.is_completed = (dataSource.is_completed)
        ? dataSource.is_completed
        : note.is_completed;
};
