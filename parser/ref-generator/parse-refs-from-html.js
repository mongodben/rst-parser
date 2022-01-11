const { Parser } = require("htmlparser2");
const { DomHandler } = require("domhandler");
const { find: findMatchingNodes } = require("domutils");
const fs = require("fs");
const { generateRelativeUrl } = require("../utils");
const { PROJECT_DIR } = require("../../settings");

function matchRefNodesCb(dom, relativePath, refs) {
  return findMatchingNodes(
    (node) => {
      // console.log(node.attribs);
      if (node.attribs?.id?.startsWith("std-label-")) {
        const id = node.attribs.id;
        const ref = node.attribs.id.slice(10);
        refs[ref] = {
          id,
          relativeUrl: `${relativePath}#${id}`,
        };
      }
    },
    dom,
    true
  );
}

function parseRefsFromHtml(filePath) {
  const refs = {};
  const relativeUrl = generateRelativeUrl(
    filePath,
    `${PROJECT_DIR}/parser/ref-generator/realm-site/docs.mongodb.com`,
    "/index.html"
  );
  const handler = new DomHandler((error, dom) => {
    if (error) {
      // Handle error
      throw error;
    } else {
      matchRefNodesCb(dom, relativeUrl, refs);
    }
  });
  const parser = new Parser(handler);
  const htmlString = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
  parser.write(htmlString);
  parser.end();
  return refs;
}

module.exports = {
  parseRefsFromHtml,
};
