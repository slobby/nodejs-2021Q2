import {Transform} from "stream";
import {Buffer} from "buffer";
import encrypt from "../utils/encrypt" 


export class Transformer extends Transform
{
   private _shift: number;
   private _action: string; 
    
   constructor(opt = {}, shift: number, action: string) {
      super(opt);
      this._shift = shift;
      this._action = action;
   }

   _transform(data : Buffer, encoding : any, callback : any){
      // I have not to even convert buffer to string, due "encript" function algorithm.
      // But I did it.
      this.push(Buffer.from(encrypt(data.toString(), this._shift, this._action)));
      callback();
   }
}
