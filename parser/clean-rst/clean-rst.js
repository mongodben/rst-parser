const roleParser = require("./role-parser/role-parser");
const scParser = require("./source-constant-parser/sc-parser");
const subParser = require("./substitution-parser/sub-parser");
const roles = require("../snooty-config/roles.json");
const refs = require("../snooty-config/refs.json");
const scs = require("../snooty-config/source-constants.json");
const subs = require("../snooty-config/substitutions.json");

function cleanRst(rst) {
  console.log("input", rst);

  rst = roleParser(rst, roles, refs);
  console.log("role parsed", rst);

  rst = scParser(rst, scs);
  console.log("sc parsed", rst);
  rst = subParser(rst, subs);
  console.log("sub parsed", rst);

  return rst;
}
module.exports = cleanRst;
