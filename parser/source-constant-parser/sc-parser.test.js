const scParser = require("./sc-parser");
const fs = require("fs");
const { SOURCE_CONSTANT_LIKE } = require("../regex");
const sourceConstants = require("../../snooty-config/source-constants.json");

const PATH =
  "/Users/ben.p/projects/rst-parser/parser/rst_in/components.schemas.DataSource.properties.config.properties.clusterName.description.rst";

fs.readFile(PATH, "utf8", (err, data) => {
  if (err) throw err;
  console.log(scParser(data, sourceConstants));
});
