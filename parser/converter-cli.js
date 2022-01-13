const fs = require("fs");
const path = require("path");
const cleanRst = require("./clean-rst");
const convertRstToMd = require("./convert-rst-to-md");
const { PROJECT_DIR } = require("../settings");

// get inputs
// eslint-disable-next-line no-unused-vars
const [_, __, fileIn, dirOut] = process.argv;

// convert snooty/sphinx to standard rst
async function convertSnootyToRst(fileIn) {
  const snootyRst = fs.readFileSync(fileIn, {
    encoding: "utf8",
    flag: "r",
  });
  const standardRst = cleanRst(snootyRst);
  return [fileIn, standardRst];
}

async function convertRstToMarkdown([fileIn, standardRst]) {
  const fileName = path.basename(fileIn, ".rst");
  // md conversion set up
  const tempDir = path.join(PROJECT_DIR, "tmp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  const tempRstFilePath = path.join(tempDir, fileName);
  fs.writeFileSync(tempRstFilePath, standardRst);
  // md conversion
  try {
    await convertRstToMd(tempRstFilePath, dirOut);
  } finally {
    // md conversion clean up
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

async function run() {
  const standardRst = await convertSnootyToRst(fileIn);
  await convertRstToMarkdown(standardRst);
  console.log(`successfully converted file '${fileIn}' from RST to Markdown.
  The Markdown file can be found in: ${dirOut}
  `);
}
run();
