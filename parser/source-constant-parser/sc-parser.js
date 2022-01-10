const { SOURCE_CONSTANT_LIKE } = require("../regex");

function replaceSourceConstants(input, scs) {
  const regex = SOURCE_CONSTANT_LIKE;
  const res = input.replaceAll(regex, (match) => {
    const sc = match.slice(2, match.length - 2);
    const newVal = scs[sc];
    return newVal;
  });
  return res;
}

module.exports = replaceSourceConstants;
