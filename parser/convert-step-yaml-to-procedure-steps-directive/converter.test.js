const fs = require("fs");
const converter = require("./converter");

const yamlFilePath =
  "/Users/ben.p/projects/rst-parser/parser/convert-step-yaml-to-procedure-steps-directive/steps-admin-api-deploy-draft.yaml";

const yamlFileStr = fs.readFileSync(yamlFilePath, {
  encoding: "utf8",
  flag: "r",
});

const out = converter(yamlFileStr);
console.log(out);
