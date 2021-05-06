import { createReadStream, createWriteStream, ReadStream, WriteStream } from "fs";
import path from "path";
import { pipeline} from "stream";

import { ArgsParser } from "./interfaces/cliParser";
import { HELP } from "./interfaces/constant";
import { isValidShift, isValidAction, isValidfileName } from "./utils/validators";
import { Transformer } from "./interfaces/transformer";
 

const argsParser: ArgsParser = new ArgsParser(HELP);
argsParser.setProperty("-a","--action", true, [isValidAction]);
argsParser.setProperty("-s", "--shift", true, [isValidShift]);
argsParser.setProperty("-i","--input", false, [isValidfileName]);
argsParser.setProperty("-o","--output", false, []);

let params: Map<string, string | undefined>;
try {
    params = argsParser.parseArgs(process.argv.slice(2))
} catch (SyntaxError) {
    process.exit(1);
}

// let { action, shift, inputFile, outputFile } = Object.fromEntries(params); es2019

const action: string = <string>params.get("action");
const shift: number = Number.parseInt(<string>params.get("shift"));
const inputFile : string | undefined = params.get("input");
const outputFile : string | undefined= params.get("output");

const reader: any = (inputFile === undefined) ? process.stdin : 
createReadStream(path.resolve(<string>inputFile));

const transformer: Transformer = new Transformer({}, shift , action);

const writer: any = (outputFile === undefined) ? process.stdout : 
createWriteStream(path.resolve(<string>outputFile), { 'flags': 'a' });

pipeline(
    reader,
    transformer,
    writer,
    (err: any) => {
      if (err) {
        console.error('Error. Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );