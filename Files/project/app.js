import fs from "fs/promises";
import path from "path";

// Command
const CREATE_NEW_LINE = "Create a File";

// function
const createFile = async (fileName) => {
  const fileExits = await fs
    .access(fileName)
    .then(() => true)
    .catch(() => false);
  if (fileExits) {
    console.log(`File ${fileName} already exists`);
  } else {
    const newFile = await fs.open(fileName, "w");
    newFile.close();
  }
};

async function main() {
  const filehandle = await fs.open("Files/project/command.txt");
  filehandle.on("change", async () => {
    const fileSize = await filehandle.stat().then((stats) => stats.size);
    const buffer = Buffer.alloc(fileSize);
    const offset = 0;
    const length = fileSize;
    const position = 0;
    await filehandle.read(buffer, offset, length, position);
    const content = buffer.toString("utf-8");
    if (content.includes(CREATE_NEW_LINE)) {
      const fileName = content.split(CREATE_NEW_LINE)[1]?.trim();
      if (fileName) {
        await createFile(fileName);
      }
    }
  });
  const watcher = fs.watch("Files/project/command.txt");

  for await (const event of watcher) {
    switch (event.eventType) {
      case "change":
        filehandle.emit("change");
        break;
    }
  }
}

main();
