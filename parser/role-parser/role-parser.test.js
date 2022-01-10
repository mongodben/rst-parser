const roleParser = require("./role-parser");
const fs = require("fs");
const roles = require("../../snooty-config/roles.json");

const PATH =
  "/Users/ben.p/projects/rst-parser/parser/rst_in/components.parameters.GroupId.description.rst";

fs.readFile(PATH, "utf8", (err, data) => {
  if (err) throw err;
  console.log(roleParser(data, roles));
});
