const spec = require("./openapi-spec.json");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

function getValFromJSONPath(jsonObj, path) {
  const pathArr = path.split(".");
  console.log(pathArr);
  let curr = jsonObj;
  const isArray = /\[\d+\]/; // checks if matches the pattern [##...]
  pathArr.forEach((segment) => {
    if (segment.match(isArray)) {
      segment = parseInt(segment.slice(1, segment.length - 1));
    }
    curr = curr[segment];
  });
  return curr;
}

function traversePaths(obj, parentPath, paths = []) {
  if (Array.isArray(obj)) {
    obj.forEach((val, i) => {
      const newKey = parentPath ? `${parentPath}.[${i}]` : `[${i}]`;
      traversePaths(obj[i], newKey, paths);
    });
  } else if (typeof obj === "object" && !Array.isArray(obj)) {
    const layerKeys = Object.keys(obj);
    for (const ky of layerKeys) {
      const newKey = parentPath ? `${parentPath}.${ky}` : ky;
      traversePaths(obj[ky], newKey, paths);
    }
  } else if (
    parentPath.endsWith(".description") ||
    parentPath.endsWith(".summary")
  ) {
    paths.push(parentPath);
  }
  return paths;
}

const pathsToDescriptionAndSummary = traversePaths(spec);
const pathsAndVals = [];
pathsToDescriptionAndSummary.forEach((path) => {
  const valAtPath = getValFromJSONPath(spec, path);
  pathsAndVals.push([path, valAtPath]);
});
pathsAndVals.forEach(([path, val]) => {
  const encodedPath = encodeURIComponent(path);
  console.log(encodedPath);
  fs.writeFileSync(`rst_in/${encodedPath}.rst`, val);
});

// unconvertable rst regex
const REF_LIKE = /:[^\s]+:`.*<[^\s]+>`/; // like: :smthn:`text blah blah <text-no-spaces>`
const SOURCE_CONSTANT_LIKE = /{\+[^\s]+\+}/; // like: {+TEXT_NO_SPACES+}
const SUBSTITUTION_LIKE = /\|[^\s]+\|/;

// descSum.forEach((val, i) => {
//   fs.writeFileSync(`rst_in/${i}.rst`, val[1]);
//   exec(
//     `pandoc rst_in/${i}.rst -f rst  -t gfm -s -o md_out/${i}.md`,
//     (error, stdout, stderr) => {
//       if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//       }
//       if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//       }
//       console.log(`stdout: ${stdout | "ok"}`);
//     }
//   );
// });
