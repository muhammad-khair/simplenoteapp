const { body } = require('express-validator');

genericNoteValidationArray = [
    body("tags")
        .optional()
        .isArray()
        .withMessage("Description should be an array"),
    body("priority")
        .optional()
        .isString()
        .withMessage("Priority should be a string in {LOW, MEDIUM, HIGH}")
        .trim()
        .isIn(["LOW", "MEDIUM", "HIGH"])
        .withMessage("Priority should be {LOW, MEDIUM, HIGH}"),
    body("is_flagged")
        .optional()
        .isBoolean()
        .withMessage("Priority should be a boolean value"),
    body("is_completed")
        .optional()
        .isBoolean()
        .withMessage("Priority should be a boolean value"),
];

exports.validateNewNoteObject = function() {
    return [
        body("description")
            .isString()
            .withMessage("Description should be a string")
            .trim()
            .notEmpty()
            .withMessage("Description should be a non-empty string"),
    ].concat(genericNoteValidationArray);
}

exports.validateUpdatedNoteObject = function() {
    return [
        body("description")
            .optional()
            .isString()
            .withMessage("Description should be a string")
            .trim()
            .notEmpty()
            .withMessage("Description should be a non-empty string"),
    ].concat(genericNoteValidationArray);
}
