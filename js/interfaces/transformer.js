"use strict";

const stream = require("stream");
const buffer = require("buffer");
const encrypt = require("../utils/encrypt");

class Transformer extends stream.Transform {
    constructor(opt = {}, shift, action) {
        super(opt);
        this._shift = shift;
        this._action = action;
    }
    
    _transform(data, encoding, callback) {
        // I have not to even convert buffer to string, due "encript" function algorithm.
        // But I did it.
        this.push(buffer.Buffer.from(encrypt.default(data.toString(), this._shift, this._action)));
        callback();
    }
}
exports.Transformer = Transformer;
