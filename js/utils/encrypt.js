"use strict";

function getCode(startCode, endCode, charCode, shift, action) {
    shift = (action === "encode") ? shift : -shift;
    const alphaLength = Math.abs(endCode - startCode) + 1;
    const calculatedCode = (charCode + shift - startCode) % alphaLength;
    return (calculatedCode >= 0) ? (startCode + calculatedCode) : (endCode + 1 + calculatedCode);
}
function encrypt(text, shift, action) {
    let result = "";
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charCode = char.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCodePoint(getCode(65, 90, charCode, shift, action));
        }
        else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCodePoint(getCode(97, 122, charCode, shift, action));
        }
        else {
            result += char;
        }
    }
    return result;
}

exports.default = encrypt;
