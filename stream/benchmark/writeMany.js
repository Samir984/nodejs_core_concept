import pfs from "fs/promises";
import fs from "fs";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// CPU uses = 100%
// Memory uses = 53MB
// Execution time = 14s
(async () => {
  console.time("writeToFileManyTime");
  await sleep(5000); // Sleep for 2 seconds
  const fileHandle = await pfs.open("./stream/test.txt", "w");
  for (let i = 0; i < 1000000; i++) {
    await fileHandle.write(` ${i} `);
  }
  fileHandle.close();
  console.timeEnd("writeToFileManyTime");
})();

console.log("------------------\n");

// CPU uses = 100%
// Memory uses= 30MB
// Execution time = 0.3ms
async () => {
  await sleep(5000);
  console.time("writeToFileManyTime");
  fs.open("./stream/test.txt", "w", (err, fd) => {
    console.log(fd);
    for (let i = 0; i < 1000000; i++) {
      fs.writeFileSync(fd, ` ${i} `);
    }
  });

  console.timeEnd("writeToFileManyTime");
};
