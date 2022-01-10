const fs = require("fs");
const { SUBSTITUTION_LIKE } = require("../regex");

function replaceSourceConstants(input, subs) {
  const regex = SUBSTITUTION_LIKE;
  const res = input.replaceAll(regex, (match) => {
    const sub = match.slice(1, match.length - 1);
    const newVal = subs[sub];
    return newVal;
  });
  return res;
}

module.exports = replaceSourceConstants;
