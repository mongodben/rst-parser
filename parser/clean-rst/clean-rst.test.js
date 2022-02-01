const cleanRst = require("./clean-rst");
const PATH =
  "/Users/ben.p/projects/rst-parser/parser/openapi-to-rst/rst_in/components.schemas.Application.properties.group_id.description.rst";
fs.readFile(PATH, "utf8", (err, data) => {
  if (err) throw err;
  cleanRst(data);
});
