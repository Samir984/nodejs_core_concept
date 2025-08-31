import { Buffer } from "buffer";

const memoeryContainer = Buffer.alloc(5);

memoeryContainer[0] = 0x68;

memoeryContainer[1] = 0x65;

memoeryContainer[2] = 0x6c;

memoeryContainer[3] = 0x6c;

memoeryContainer[4] = 0x6f;

const myBuffer = Buffer.from("hi", "utf-8");

console.log(memoeryContainer.toString("utf-8"));
console.log(myBuffer.toString("utf-8"));

// other see read from docs: https://nodejs.org/api/buffer.html#buffer
