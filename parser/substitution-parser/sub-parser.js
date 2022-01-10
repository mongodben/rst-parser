const fs = require("fs");
const { SUBSTITUTION_LIKE } = require("../regex");
const substitutions = require("../../snooty-config/substitutions.json");

function replaceSourceConstants(input, regex, subs) {
  const res = input.replaceAll(regex, (match) => {
    const sub = match.slice(1, match.length - 1);
    const newVal = subs[sub];
    return newVal;
  });
  return res;
}

module.exports = replaceSourceConstants;
