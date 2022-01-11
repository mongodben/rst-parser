const { REF_LIKE } = require("../regex");

function replaceRoles(input, roles, refs) {
  const regex = REF_LIKE;
  const res = input.replaceAll(regex, (match) => {
    let text = match.match(/:`.*</)[0]; // the text inside the link
    text = text.slice(2, text.length - 1).trim();
    let fullUrl = "";
    const role = match.split(":")[1];
    let angleBracketContent = match.match(/\<[^\s]+\>/)[0]; // stuff between angle brackets at the end
    angleBracketContent = angleBracketContent.slice(
      1,
      angleBracketContent.length - 1
    );

    if (role === "ref") {
      fullUrl = refs[angleBracketContent].relativeUrl;
    } else {
      const roleBaseUrl = roles[role];
      fullUrl = roleBaseUrl.replace("%s", angleBracketContent);
    }
    const rstLink = `\`${text} <${fullUrl}>\`_`;
    return rstLink;
  });
  return res;
}

module.exports = replaceRoles;
