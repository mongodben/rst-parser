const fs = require("fs");
const path = require("path");
const { LITERAL_INCLUDE } = require("../regex");

// TODO: fix fact that this will only work with a UNIX style file system b/c of the way that
// snooty includes the paths to files. additional work would need to be make OS agnostic.
// wouldn't be too hard. just split the path based on '/' and use path.join() method

// TODO: add language support
function addLiteralIncludeAsSnooty(inputSnooty, pathToIncludesFilesDir) {
  const rstWithSteps = inputSnooty.replaceAll(
    LITERAL_INCLUDE,
    (_, includeFileRelativePath) => {
      const filePath = path.join(
        pathToIncludesFilesDir,
        includeFileRelativePath
      );
      const fileContent = fs.readFileSync(filePath, {
        encoding: "utf8",
        flag: "r",
      });
      return `.. code-block::
      
      ${fileContent}
      `;
    }
  );
  return rstWithSteps;
}

module.exports = addLiteralIncludeAsSnooty;
