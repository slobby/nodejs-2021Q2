export default function encrypt(text: string, shift: number): string {
    let result: string = "";

    for (let i = 0; i < text.length; i++) {
        const char: string = text[i];
        const charCode: number = char.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCodePoint((charCode + shift - 65) % 26 + 65);
        }
        else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCodePoint((charCode + shift - 97) % 26 + 97);
        }
        else {
            result += char;
        }
        }
        return result;
    }

