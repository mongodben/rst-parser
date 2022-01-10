const fs = require("fs");
const { SOURCE_CONSTANT_LIKE } = require("../regex");
const sourceConstants = require("../../snooty-config/source-constants.json");

function replaceSourceConstants(input, regex, scs) {
  const res = input.replaceAll(regex, (match) => {
    const sc = match.slice(2, match.length - 2);
    const newVal = scs[sc];
    return newVal;
  });
  return res;
}

module.exports = replaceSourceConstants;
