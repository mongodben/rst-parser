const fs = require("fs");
const { exec } = require("child_process");
const { PROJECT_DIR } = require("../settings");
const path = require("path");

function convertRstToMd(rstFilePath, mdOutDir) {
  const split = rstFilePath.split("/");
  let filename = split[split.length - 1];
  filename = filename.slice(0, filename.length - 4); // remove '.rst' from new file name
  const pathOut = path.join(mdOutDir, `${filename}.md`);
  exec(
    `pandoc ${rstFilePath} -f rst  -t gfm -s -o ${pathOut}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout | "ok"}`);
    }
  );
}

module.exports = convertRstToMd;

const mdOutDir = path.join(PROJECT_DIR, "parser", "md_out");
const rstInDir = path.join(PROJECT_DIR, "parser", "rst_in");
fs.readdir(rstInDir, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    const fullPathToFile = path.join(rstInDir, file);
    convertRstToMd(fullPathToFile, mdOutDir);
    console.log("converted from RST to MD:", file);
  });
});
