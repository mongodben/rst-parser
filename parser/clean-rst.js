const roleParser = require("./role-parser/role-parser");
const scParser = require("./source-constant-parser/sc-parser");
const subParser = require("./substitution-parser/sub-parser");
const fs = require("fs");
const roles = require("../snooty-config/roles.json");
const scs = require("../snooty-config/source-constants.json");
const subs = require("../snooty-config/substitutions.json");

function cleanRst(rst) {
  console.log("input", rst);

  rst = roleParser(rst, roles);
  console.log("role parsed", rst);

  rst = scParser(rst, scs);
  console.log("sc parsed", rst);
  rst = subParser(rst, subs);
  console.log("sub parsed", rst);

  return rst;
}
module.exports = cleanRst;

const PATH =
  "/Users/ben.p/projects/rst-parser/parser/openapi-to-rst/rst_in/components.schemas.Application.properties.group_id.description.rst";
fs.readFile(PATH, "utf8", (err, data) => {
  if (err) throw err;
  console.log(cleanRst(data));
});
