import {Transform} from "stream";
import {Buffer} from "buffer";
import encrypt from "../utils/encrypt" 


export class Transformer extends Transform
{
   private _shift: number;
   private _action: string; 
    
   constructor(opt = {}, shift: number, action: string)
   {
      super(opt);
      this._shift = shift;
      this._action = action;
   }
   /**
    * метод, реализующий в себе запись данных (chunk поступают в поток Transform), 
    * и чтение данных - когда другой поток читает из Transform
    * @param chunk
    * @param encoding
    * @param done - в общем случае done(err, chunk)
    * @private
    */
   _transform(data : Buffer, encoding : any, callback : any)
  {
      this.push(Buffer.from(encrypt(data.toString(), this._shift, this._action)));
      callback();
   }
}
