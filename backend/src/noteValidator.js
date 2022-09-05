const { body } = require('express-validator');

genericNoteValidationArray = [
    body("tags")
        .optional()
        .isArray()
        .withMessage("tags should be an array").bail(),
    body("priority")
        .optional()
        .isString()
        .withMessage("priority should be a string in {LOW, MEDIUM, HIGH}").bail()
        .trim()
        .isIn(["LOW", "MEDIUM", "HIGH"])
        .withMessage("priority should be {LOW, MEDIUM, HIGH}").bail(),
    body("is_flagged")
        .optional()
        .isBoolean()
        .withMessage("is_flagged should be a boolean value").bail(),
    body("is_completed")
        .optional()
        .isBoolean()
        .withMessage("is_completed should be a boolean value").bail(),
];

exports.validateNewNoteObject = function() {
    return [
        body("description")
            .isString()
            .withMessage("description should be a string").bail()
            .trim()
            .notEmpty()
            .withMessage("description should be a non-empty string").bail(),
    ].concat(genericNoteValidationArray);
}

exports.validateUpdatedNoteObject = function() {
    return [
        body("description")
            .optional()
            .isString()
            .withMessage("description should be a string").bail()
            .trim()
            .notEmpty()
            .withMessage("description should be a non-empty string").bail(),
    ].concat(genericNoteValidationArray);
}
