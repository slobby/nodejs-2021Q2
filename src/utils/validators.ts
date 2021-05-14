import { ACTION, USEHELP } from "../interfaces/constant"
import { accessSync, constants } from "fs"

import { Duplex } from "stream"

export function isValidShift (shift: string, logger: Duplex ): Boolean {
    let isValid: Boolean = true;
    if (isNaN(Number.parseInt(shift))) {
        logger.write(`Error. ${shift} - can't parse to integer. ${USEHELP}\n`);
        isValid = false;
    }
    return isValid
};

export function isValidAction (inputAction: string, logger: Duplex ): Boolean {
    let isValid: Boolean = true;
    if (!ACTION.includes(inputAction)){
        logger.write(`Error. ${inputAction} - can't parse to action. ${USEHELP}\n`);
        isValid = false;
    }
    return isValid
};

export function isValidfileName (fileName: string, logger: Duplex ): Boolean {
    let isValid: Boolean = true;
    try {
        accessSync(fileName, constants.F_OK);
    }
    catch (err) {
        logger.write(`Error. ${fileName} does not exist.\n`);
        isValid = false;
    }
    if (isValid) {
        try {
            accessSync(fileName, constants.R_OK);
        }
        catch (err) {
            logger.write(`Error. ${fileName} is not readable.\n`);
            isValid = false;
        }
    }
    return isValid;
};

export function isValidFileToWrite (fileName: string, logger: Duplex ): Boolean {
    let isValid: Boolean = true;
    let isExist: Boolean = true;
    try {
        accessSync(fileName, constants.F_OK);
    }
    catch (err) {
        isExist = false;
    }
    if (isExist) {
        try {
            accessSync(fileName, constants.W_OK);
        }
        catch (err) {
            logger.write(`Error. ${fileName} is not writable.\n`);
            isValid = false;
        }
    }
    return isValid;
};
