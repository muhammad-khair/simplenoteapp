const { validateNewNoteObject, validateUpdatedNoteObject } = require("./noteValidator");
let router = require("express").Router();
let noteController = require("./noteController");

router.get("/", (req, res) => {
    console.log("/api route called");
    res.json();
});

router.route("/note")
    .get(noteController.index)
    .post(validateNewNoteObject(), noteController.new);

router.route("/note/:note_id")
    .get(noteController.view)
    .put(validateUpdatedNoteObject(), noteController.update)
    .delete(noteController.delete);

module.exports = router;
