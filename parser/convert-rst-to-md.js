const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { PROJECT_DIR } = require("../settings");
const path = require("path");

async function convertRstToMd(rstFilePath, mdOutDir) {
  const split = rstFilePath.split("/");
  let filename = split[split.length - 1];
  filename = filename.slice(0, filename.length - 4); // remove '.rst' from new file name
  const pathOut = path.join(mdOutDir, `${filename}.md`);

  const { stdout, stderr } = await exec(
    `pandoc ${rstFilePath} -f rst  -t gfm -s -o ${pathOut}`
  );
  console.log("stdout:", stdout);
  if (stderr) throw new Error(stderr);
}

module.exports = convertRstToMd;

// const mdOutDir = path.join(PROJECT_DIR, "parser", "md_out");
// const rstInDir = path.join(PROJECT_DIR, "parser", "rst_in");
// fs.readdir(rstInDir, function (err, files) {
//   //handling error
//   if (err) {
//     return console.log("Unable to scan directory: " + err);
//   }
//   //listing all files using forEach
//   files.forEach(function (file) {
//     // Do whatever you want to do with the file
//     const fullPathToFile = path.join(rstInDir, file);
//     convertRstToMd(fullPathToFile, mdOutDir);
//     console.log("converted from RST to MD:", file);
//   });
// });
