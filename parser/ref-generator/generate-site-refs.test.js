const { getFilesInDirectoryAndSubDirs } = require("./generate-site-refs");
const { PROJECT_DIR } = require("../../settings");

const SITE_PATH = `${PROJECT_DIR}/parser/ref-generator/realm-site/docs.mongodb.com/realm`;
const files = getFilesInDirectoryAndSubDirs(SITE_PATH);
console.log(files);
