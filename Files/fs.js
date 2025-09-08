import fs from "fs";

const data = fs.readFileSync("Files/text.txt");

console.log(data.toString("utf-8"));

