import pfs from "fs/promises";
import fs from "fs";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// CPU uses = 100%
// Memory uses = 53MB
// Execution time = 14sec
async () => {
  await sleep(5000); // Sleep for 2 seconds
  console.time("writeToFileManyTime");
  const fileHandle = await pfs.open("./stream/test.txt", "w");
  for (let i = 0; i < 1000000; i++) {
    await fileHandle.write(` ${i} `);
  }
  fileHandle.close();
  console.timeEnd("writeToFileManyTime");
};

console.log("------------------\n");

// CPU uses = 100%
// Memory uses= 30MB
// Execution time = 2s
async () => {
  await sleep(5000);
  fs.open("./stream/test.txt", "w", (err, fd) => {
    console.time("writeToFileManyTime_2nd");
    for (let i = 0; i < 1000000; i++) {
      fs.writeFileSync(fd, ` ${i} `);
    }
    console.timeEnd("writeToFileManyTime_2nd");
  });
};

// stream way

// CPU uses = 100%
// Memory uses = 200MB
// Execution time = 300ms
async () => {
  await sleep(5000);
  console.time("writeToFileManyTime_3rd");
  const fileHandle = await pfs.open("./stream/test.txt", "w");
  const stream = fileHandle.createWriteStream();
  for (let i = 0; i < 1000000; i++) {
    const buffer = Buffer.from(` ${i} `, "utf-8");
    stream.write(buffer);
  }
  fileHandle.close();
  console.timeEnd("writeToFileManyTime_3rd");
};

// optimize way

// CPU uses = 100%
// Memory uses = 60MB
// Execution time = 300ms
(async () => {
  console.time("writeToFileManyTime_3rd");
  const fileHandle = await pfs.open("./stream/test.txt", "w");
  const stream = fileHandle.createWriteStream();
  let i = 1;
  console.log("stream.writableHighWaterMark", stream.writableHighWaterMark);
  const writeToStream = () => {
    while (i <= 1000000) {
      const buffer = Buffer.from(`${i} `, "utf-8");
      // this is last write
      if (i === 1000000) {
        console.log("buffer is full", stream.writableLength, i);
        stream.end(buffer);
        return;
      }
      if (!stream.write(buffer)) {
        console.log("buffer is full", stream.writableLength, i);
        break;
      }
      i++;
    }
  };

  stream.on("drain", () => {
    console.log("Drained!!", stream.writableLength);
    writeToStream();
  });

  stream.on("finish", () => {
    console.log("Operation ended");
    console.timeEnd("writeToFileManyTime_3rd");
    fileHandle.close();
  });
  writeToStream();
})();
