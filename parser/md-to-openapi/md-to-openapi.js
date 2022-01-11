const spec = require("../../openapi-spec.json");
const fs = require("fs");
const path = require("path");
const { set } = require("lodash");
const { PROJECT_DIR } = require("../../settings");

function extractJsonPathFromFileName(
  filename,
  pathToIgnore,
  extensionToIgnore
) {
  const encodedJsonPath = filename.slice(
    pathToIgnore.length + 1,
    filename.length - extensionToIgnore.length
  );
  const decodedJsonPath = decodeURIComponent(encodedJsonPath);
  console.log("decoded json path\n", decodedJsonPath);
  return decodedJsonPath;
}

function updateSpecVal(spec, pathToVal, newVal) {
  const levels = pathToVal.split(".");
  console.log("levels::", levels);
  const isArrayIndex = /\[\d+\]/; // checks if matches the pattern [##...]
  let lodashFormattedPathToVal = levels[0]; // format for use in https://lodash.com/docs/4.17.15#set
  console.log("initial path to val", lodashFormattedPathToVal);
  for (let i = 1; i < levels.length; i++) {
    const val = levels[i];
    if (val.match(isArrayIndex)) {
      lodashFormattedPathToVal += val;
    } else {
      lodashFormattedPathToVal = lodashFormattedPathToVal + "." + val;
    }
    console.log(i, ":", lodashFormattedPathToVal);
  }
  console.log({ lodashFormattedPathToVal });
  set(spec, lodashFormattedPathToVal, newVal);
  console.log("~~~~");
  // .map((val) => {
  //   for(i = 0; i<)
  //   if (val.match(isArrayIndex)) {
  //     return parseInt(val.slice(1, val.length - 1));
  //   } else return val;
  // });
  // let currLevel = null;
  // levels.forEach((level) => {
  //   currLevel = spec[level];
  // });
  // currLevel = newVal;
}

// TODO: get all the .md files
// for each:
// - extractJsonPathFromFileName
// - get current body
// - updateSpecVal
const mdOutDir = path.join(PROJECT_DIR, "parser", "md_out");
fs.readdir(mdOutDir, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    const pathToDirectory = path.join(PROJECT_DIR, "parser", "md_out");
    const pathToFile = path.join(pathToDirectory, file);
    const jsonPath = extractJsonPathFromFileName(
      pathToFile,
      pathToDirectory,
      ".md"
    );
    const fileContent = fs.readFileSync(pathToFile, {
      encoding: "utf8",
      flag: "r",
    });
    updateSpecVal(spec, jsonPath, fileContent);
  });
  const newSpecPath = path.join(PROJECT_DIR, "gen_out", "openapi-spec-md.json");
  fs.writeFileSync(newSpecPath, JSON.stringify(spec));
});
