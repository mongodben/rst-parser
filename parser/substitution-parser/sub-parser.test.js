const scParser = require("./sub-parser");
const fs = require("fs");
const { SUBSTITUTION_LIKE } = require("../regex");
const substitutions = require("../../snooty-config/substitutions.json");

const PATH =
  "/Users/ben.p/projects/rst-parser/parser/rst_in/components.parameters.GroupId.description.rst";

fs.readFile(PATH, "utf8", (err, data) => {
  if (err) throw err;
  console.log(scParser(data, substitutions));
});
