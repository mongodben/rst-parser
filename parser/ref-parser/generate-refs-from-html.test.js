const { parseRefsFromHtml } = require("./generate-refs-from-html");
const { PROJECT_DIR } = require("../../settings");

const PATH = `${PROJECT_DIR}/parser/ref-parser/realm-site/docs.mongodb.com/realm/authentication/anonymous/index.html`;
const refs = parseRefsFromHtml(PATH);
console.log(refs);
