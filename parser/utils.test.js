const { generateRelativeUrl } = require("./utils");

const PATH =
  "/Users/ben.p/projects/rst-parser/parser/ref-generator/realm-site/docs.mongodb.com/realm/authentication/anonymous/index.html";
const START =
  "/Users/ben.p/projects/rst-parser/parser/ref-generator/realm-site/docs.mongodb.com";
const END = "/index.html";
const res = generateRelativeUrl(PATH, START, END);
console.log(res);
