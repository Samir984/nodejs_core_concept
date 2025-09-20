import fs from "fs/promises";
import { pipeline } from "node:stream";

// Memory usage = 1GB
// Execution time = 400ms
async () => {
  console.time("readBig");
  const destFile = await fs.open("./stream/dest.txt", "w");
  const result = await fs.readFile("./stream/test.txt");
  await destFile.write(result);
  setInterval(() => {}, 1000);
  destFile.close();
  console.timeEnd("readBig");
};

// Memory usage = 30MB
// Execution time = 1.8 seconds
async () => {
  console.time("readBig");
  const sourceFile = await fs.open("./stream/test.txt", "r");
  const destFile = await fs.open("./stream/dest.txt", "w");

  let byteRead = -1;

  while (byteRead !== 0) {
    let readDate = await sourceFile.read();
    byteRead = readDate.bytesRead;
    if (byteRead !== 16384) {
      const indexOfNotFilled = readDate.buffer.indexOf(0);
      destFile.write(readDate.buffer.slice(0, indexOfNotFilled));
    } else {
      await destFile.write(readDate.buffer);
    }
  }

  sourceFile.close();
  destFile.close();
  console.timeEnd("readBig");
};

// using piping
// Memory usage = 30MB
// Execution time = 700ms seconds

async () => {
  console.time("readBig");
  const sourceFile = await fs.open("./stream/test.txt", "r");
  const destFile = await fs.open("./stream/dest.txt", "w");

  const readerStream = sourceFile.createReadStream();
  const writerStream = destFile.createWriteStream();

  readerStream.pipe(writerStream);

  // Close streams and calculate time when the operation is complete
  readerStream.on("end", () => {
    console.log("Operation ended");
    readerStream.close();
    writerStream.close();
    console.timeEnd("readBig");
  });
};

// Pipeline is better way (has robust error handling) than piping.

(async () => {
  console.time("readBig");
  const sourceFile = await fs.open("./stream/test.txt", "r");
  const destFile = await fs.open("./stream/dest.txt", "w");
  const readerStream = sourceFile.createReadStream();
  const writerStream = destFile.createWriteStream();

  pipeline(readerStream, writerStream, (err) => {
    if (err) {
      console.error(err);
    }
    readerStream.close();
    writerStream.close();
    console.timeEnd("readBig");
  });
})();
