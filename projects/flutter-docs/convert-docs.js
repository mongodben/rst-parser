const fs = require("fs");
const path = require("path");
const config = require("./config");
const addStepFileAsSnooty = require("../../parser/add-step-files-as-snooty");
const addIncludeAsSnooty = require("../../parser/add-include-as-snooty");
const addliteralincludeAsSnooty = require("../../parser/add-literalinclude-as-snooty");
const cleanRst = require("../../parser/clean-rst");
const rstToMd = require("../../parser/rst-to-md");

async function convertPage(snootyText) {
  const includesDir = path.join(
    config.pathToDocsRepo,
    config.pathToIncludesWithinDocsRepo
  );
  // convert step files to Snooty style RST
  const stepsRemovedRst = addStepFileAsSnooty(
    snootyText,
    path.join(config.pathToDocsRepo, config.pathToIncludesWithinDocsRepo)
  );
  // add includes and literalincludes
  const rstWithIncludes = addIncludeAsSnooty(stepsRemovedRst, includesDir);
  const rstWithLiteralincludes = addliteralincludeAsSnooty(
    rstWithIncludes,
    includesDir
  );

  // convert snooty style rst to plain RST
  const plainRst = cleanRst(rstWithLiteralincludes);
  // convert RST to MD
  const mdDoc = await rstToMd(plainRst);

  return mdDoc;
}

config.pagesToConvert.forEach((page) => {
  const pageRst = fs.readFileSync(path.join(config.pathToDocsRepo, page), {
    encoding: "utf8",
    flag: "r",
  });
  const pageName = path.basename(page).replace(".txt", ".md");
  convertPage(pageRst).then((pageMd) => {
    const relativePagePath = path.join(__dirname, "gen_dfm_docs_out", pageName);
    fs.writeFileSync(relativePagePath, pageMd);
    console.log("created page:", relativePagePath);
  });
});
