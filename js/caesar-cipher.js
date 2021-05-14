"use strict";

const fs = require("fs");
const path = require("path");
const stream = require("stream");

const cliParser = require("./interfaces/cliParser");
const {HELP} = require("./interfaces/constant");
const validators = require("./utils/validators");
const {Transformer} = require("./interfaces/transformer");
let params;

const argsParser = new cliParser.ArgsParser(HELP);

argsParser.setProperty("-a", "--action", true, [validators.isValidAction]);
argsParser.setProperty("-s", "--shift", true, [validators.isValidShift]);
argsParser.setProperty("-i", "--input", false, [validators.isValidfileName]);
argsParser.setProperty("-o", "--output", false, [validators.isValidFileToWrite]);

try {
    params = argsParser.parseArgs(process.argv.slice(2));
}
catch (SyntaxError) {
    process.exit(1);
}

// let { action, shift, inputFile, outputFile } = Object.fromEntries(params); es2019

const action = params.get("action");
const shift = Number.parseInt(params.get("shift"));
const inputFile = params.get("input");
const outputFile = params.get("output");

const reader = (inputFile === undefined) ? process.stdin :
    fs.createReadStream(path.resolve(inputFile));

const transformer = new Transformer({}, shift, action);

const writer = (outputFile === undefined) ? process.stdout :
    fs.createWriteStream(path.resolve(outputFile), { 'flags': 'a' });

stream.pipeline(reader, transformer, writer, (err) => {
    if (err) {
        process.stderr.write('Error. Pipeline failed.', err);
    }
});
