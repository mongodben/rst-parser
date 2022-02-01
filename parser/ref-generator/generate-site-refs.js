const path = require("path");
const fs = require("fs");
const { merge } = require("lodash");
// const { PROJECT_DIR } = require("../../settings");
const { parseRefsFromHtml } = require("./parse-refs-from-html");

function getFilesInDirectoryAndSubDirs(rootDir, files = []) {
  fs.readdirSync(rootDir).forEach((file) => {
    const absolute = path.join(rootDir, file);
    if (fs.statSync(absolute).isDirectory()) {
      getFilesInDirectoryAndSubDirs(absolute, files);
    } else files.push(absolute);
  });
  return files;
}

function generateAllRefsFromHtmlFiles(files) {
  const refsByFile = [];
  files.forEach((file) => {
    if (!file.endsWith(".html")) {
      throw new Error(`'${file}' must be a .html file `);
    }
    const fileRefs = parseRefsFromHtml(file);
    refsByFile.push(fileRefs);
  });
  const allRefs = merge({}, ...refsByFile);
  return allRefs;
}

// const sitePath = `${PROJECT_DIR}/parser/ref-generator/realm-site/docs.mongodb.com/realm`;
// const siteHtmlFiles = getFilesInDirectoryAndSubDirs(sitePath).filter(
//   (filename) => filename.endsWith(".html")
// );
// const refs = generateAllRefsFromHtmlFiles(siteHtmlFiles);
// fs.writeFileSync(
//   `${PROJECT_DIR}/snooty-config/refs.json`,
//   JSON.stringify(refs)
// );

function createRefsFromSite(siteDirIn) {
  const siteHtmlFiles = getFilesInDirectoryAndSubDirs(siteDirIn).filter(
    (filename) => filename.endsWith(".html")
  );
  const refs = generateAllRefsFromHtmlFiles(siteHtmlFiles);
  return refs;
}
module.exports = {
  getFilesInDirectoryAndSubDirs,
  generateAllRefsFromHtmlFiles,
  createRefsFromSite,
};
