const { generateRelativeUrl } = require("./utils");

const PATH =
  "/Users/ben.p/projects/rst-parser/parser/ref-parser/realm-site/docs.mongodb.com/realm/authentication/anonymous/index.html";
const START =
  "/Users/ben.p/projects/rst-parser/parser/ref-parser/realm-site/docs.mongodb.com";
END = "/index.html";
const res = generateRelativeUrl(PATH, START, END);
console.log(res);
