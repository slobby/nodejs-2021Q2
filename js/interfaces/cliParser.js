"use strict";

const {HELP, USEHELP} = require("../interfaces/constant");

class ArgsParser {

    constructor(help = "Help") {
        this._properties = [];
        this._helpProperty = {
            key: "-h",
            alias: "--help",
            name: "help",
            value: help,
            requiered: true,
            validators: []
        };

        this._properties.push(this._helpProperty);
    }

    setProperty(key, alias, required, validators) {
        let item = {
            key: key,
            alias: alias,
            name: key.slice(1) > alias.slice(2) ? key.slice(1) : alias.slice(2),
            value: undefined,
            requiered: required,
            validators: validators
        };
        this._properties.push(item);
    }
    parseArgs(args) {
        if (args.includes(this._helpProperty.key) || args.includes(this._helpProperty.alias)) {
            process.stdout.write(HELP);
            process.exit(0);
        }

        let missRequired = false;

        if (args.length > 3) {
            let i = 0;
            do {
                for (let j = 0; j < this._properties.length; j++) {
                    if ((args[i] === this._properties[j].key) || (args[i] === this._properties[j].alias)) {
                        let CadidateValue = args[i + 1];
                        let isValidParam = this._properties[j].validators.reduce((isValid, validator) => {
                            return (isValid && validator(CadidateValue, process.stderr));
                        }, true);
                        if (isValidParam) {
                            if (this._properties[j].value !== undefined) {
                                process.stderr.write(`Warning. Option: ${args[i]} dublicated.\n`);
                            }
                            this._properties[j].value = CadidateValue;
                            i++;
                            break;
                        }
                        else {
                            throw SyntaxError;
                        }
                    }
                    else {
                        if (j == this._properties.length - 1) {
                            i = args.length - 1;
                        }
                    }
                }
                i++;
            } while (i < args.length - 1);
        }
        this._properties.forEach((item) => {
            if (item.requiered && item.value === undefined) {
                missRequired = true;
                process.stderr.write(`Error. Option: ${item.key},${item.alias} are requaired.\n`);
            }
        });
        if (missRequired) {
            process.stderr.write(`${USEHELP}`);
            throw SyntaxError;
        }
        return new Map(this._properties.map((item) => [item.name, item.value]));
    }
}

exports.ArgsParser = ArgsParser;
