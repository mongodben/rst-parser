const { REF_LIKE } = require("../regex");

function replaceRoles(input, roles) {
  const regex = REF_LIKE;
  const res = input.replaceAll(regex, (match) => {
    if (match.startsWith(":ref:")) return match; // no refs today

    const role = match.split(":")[1];
    const roleBaseUrl = roles[role];
    let remainingUrl = match.match(/\<[^\s]+\>/)[0]; // stuff between angle brackets at the end
    remainingUrl = remainingUrl.slice(1, remainingUrl.length - 1);
    const fullUrl = roleBaseUrl.replace("%s", remainingUrl);
    let text = match.match(/:`.*</)[0];
    text = text.slice(2, text.length - 1).trim();
    // TODO: parse this to a standard RST link instead of markdown. current state is
    // getting ahead of ourselves, mixing rst and markdown
    const mdLink = `[${text}](${fullUrl})`;
    return mdLink;
  });
  return res;
}

module.exports = replaceRoles;
