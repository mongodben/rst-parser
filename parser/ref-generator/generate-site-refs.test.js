const fs = require("fs");
const path = require("path");
const { createRefsFromSite } = require("./generate-site-refs");
const { PROJECT_DIR } = require("../../settings");

const SITE_PATH = `${PROJECT_DIR}/parser/ref-generator/realm-site/docs.mongodb.com/realm`;
const refs = createRefsFromSite(SITE_PATH);
console.log(refs);
const refsOut = path.join(PROJECT_DIR, "gen_config", "ref-map.json");
fs.writeFileSync(refsOut, JSON.stringify(refs, null, 2));
console.log("wrote files to:", refsOut);
