const spec = require("./spec.json");
const fs = require("fs");
const { PROJECT_DIR } = require("../../../settings");
const path = require("path");

const trimWhiteSpace = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      trimWhiteSpace(obj[key]);
    } else if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    }
  });
  return obj;
};

const trimmedSpec = trimWhiteSpace(spec);

const pathOut = path.join(PROJECT_DIR, "modified", "spec-trimmed.json");
fs.writeFileSync(pathOut, JSON.stringify(trimmedSpec));
