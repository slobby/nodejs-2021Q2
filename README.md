# caesar-cipher


This is a command line aplication, for encripting and decrypting text with Caesar's cipher.\
The app encripts and decrypts only letters of Latin alphabet, all other characters are\
 ommited and remain unganged.



## How to install

1. Install the latest version of 'Node.js' from https://nodejs.org.
2. Download this repository.
3. Run the command line or "bash" and go to the application folder.
4. Run the command "npm i" or "npm install" and wait until \ 
   instalation process will not be complited.
5. Go to the "js" folder

---

## How to use

In the folder "js" enter the following into the command line:\
"node caesar-cipher [options]" where options are:

|Short alias|Full alias|Mandatory|Possible value |   Description             |
|:---------:|----------|:-------:|---------------|---------------------------|
|     -a    | --action |  yes    | encode/decode |encrypt/decript            |
|     -s    | --shift  |  yes    |  any integer  |denotes a shift for letters|
|     -i    | --input  |  no     |any file name  | input file                |
|     -o    | --output |  no     |any file name  | output file               |


If the "input file" and/or "output file" are ommited, then reading and/or writing \
will be carried out from/to the command line.

To interrupt the process, in that case, press "ctrl+C".

---

## Examples

Usage example:

1. **-a (--action**) is encode

`$ node caesar-cipher -a encode -s 7 -i "./input.txt" -o "./output.txt"`

>input.txt `This is secret. Message about "_" symbol!`

>output.txt `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

`$ node caesar-cipher --action encode --shift 7 --input plain.txt --output encoded.txt`

>plain.txt `This is secret. Message about "_" symbol!`

>encoded.txt `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. **-a (--action)** is decode
Decoding encoded initial string with the same -s(--shift) number produces the initial string.

`$ node caesar-cipher --action decode --shift 7 --input encoded.txt --output plain.txt`

>encoded.txt `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

>plain.txt `This is secret. Message about "_" symbol!`

3. Negative shift handling

`$ node caesar-cipher --action encode --shift -1 --input plain.txt --output encoded.txt`

>plain.txt `This is secret. Message about "_" symbol!`

>encoded.txt Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!


## Project structure

- - js - (folder with pure "js" files)
 |
  - src - ( source folder for "ts" files )
 |
  - dist - ( output folder for generated "js" files from "ts")

To get "js" files in folder "dist" just go to project home directory and enter "tsc" in command line.