export const ACTION: Array<string> = ["encode", "decode"]
export const USEHELP  = "\nUse -h(--help) for information.\n"
export const HELP = `\nusage: caesar-cipher [options] \n
    options: \n
    -a, --action: an action (encode/decode - required) \n
    -s, --shift: a shift (integer - required) \n
    -i, --input: an input file (fileName - not required) \n
    -o, --output: an output file (fileName - not required)\n`