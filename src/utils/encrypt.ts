function getCode(startCode: number, endCode: number, charCode: number, shift: number, action: string) : number {
    shift = (action === "encode") ? shift : -shift;
    const alphaLength = Math.abs(endCode - startCode) + 1;
    const calculatedCode : number = (charCode + shift - startCode) % alphaLength;
    return (calculatedCode >= 0) ? (startCode + calculatedCode) : (endCode + 1 + calculatedCode);
}

export default function encrypt(text: string, shift: number, action: string): string {
    let result: string = "";

    for (let i = 0; i < text.length; i++) {
        const char: string = text[i];
        const charCode: number = char.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCodePoint(getCode(65, 90, charCode, shift, action));
        }
        else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCodePoint(getCode(97, 122, charCode, shift, action));
        }
        else { result += char; }
        }
    return result;
}