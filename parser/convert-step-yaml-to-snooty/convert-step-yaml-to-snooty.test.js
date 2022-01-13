const convertYamlStepFileToSnooty = require("./convert-step-yaml-to-snooty");
const fs = require("fs");
const path = require("path");

const fileToConvert = path.join(__dirname, "steps-admin-api-deploy-draft.yaml");
const fileOut = path.join(__dirname, "steps-admin-api-deploy-draft.rst");

const snootyFileStr = convertYamlStepFileToSnooty(fileToConvert, {
  underlineChar: "~",
});
fs.writeFileSync(fileOut, snootyFileStr);
console.log(snootyFileStr);
