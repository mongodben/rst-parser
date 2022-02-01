const roleParser = require("../role-parser");
const scParser = require("../source-constant-parser");
const subParser = require("../substitution-parser");
const roles = require("../../snooty-config/roles.json");
const refs = require("../../snooty-config/refs.json");
const scs = require("../../snooty-config/source-constants.json");
const subs = require("../../snooty-config/substitutions.json");

function cleanRst(rst) {
  rst = roleParser(rst, roles, refs);
  console.log("roles and refs parsed");

  rst = scParser(rst, scs);
  console.log("source constants parsed");
  rst = subParser(rst, subs);
  console.log("substitutions parsed");

  return rst;
}
module.exports = cleanRst;
