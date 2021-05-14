"use strict";

const {ACTION, USEHELP} = require("../interfaces/constant");
const fs = require("fs");

function isValidShift(shift, logger) {
    let isValid = true;
    if (isNaN(Number.parseInt(shift))) {
        logger.write(`Error. ${shift} - can't parse to integer. ${USEHELP}\n`);
        isValid = false;
    }
    return isValid;
}

function isValidAction(inputAction, logger) {
    let isValid = true;
    if (!ACTION.includes(inputAction)) {
        logger.write(`Error. ${inputAction} - can't parse to action. ${USEHELP}\n`);
        isValid = false;
    }
    return isValid;
}

function isValidfileName(fileName, logger) {
    let isValid = true;
    try {
        fs.accessSync(fileName, fs.constants.F_OK);
    }
    catch (err) {
        logger.write(`Error. ${fileName} does not exist.\n`);
        isValid = false;
    }
    if (isValid) {
        try {
            fs.accessSync(fileName, fs.constants.R_OK);
        }
        catch (err) {
            logger.write(`Error. ${fileName} is not readable.\n`);
            isValid = false;
        }
    }
    return isValid;
}

function isValidFileToWrite(fileName, logger) {
    let isValid = true;
    let isExist = true;
    try {
        fs.accessSync(fileName, fs.constants.F_OK);
    }
    catch (err) {
        isExist = false;
    }
    if (isExist) {
        try {
            fs.accessSync(fileName, fs.constants.W_OK);
        }
        catch (err) {
            logger.write(`Error. ${fileName} is not writable.\n`);
            isValid = false;
        }
    }
    return isValid;
}

exports.isValidfileName = isValidfileName;
exports.isValidAction = isValidAction;
exports.isValidShift = isValidShift;
exports.isValidFileToWrite = isValidFileToWrite;
