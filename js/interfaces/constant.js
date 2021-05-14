"use strict";

exports.ACTION = ["encode", "decode"];

exports.USEHELP = "\nUse -h(--help) for information.\n";

exports.HELP = `\nusage: caesar-cipher [options] \n
    options: \n
    -a, --action: an action (encode/decode - required) \n
    -s, --shift: a shift (integer - required) \n
    -i, --input: an input file (fileName - not required) \n
    -o, --output: an output file (fileName - not required)\n`;
