const fs = require("fs");
const converter = require("./converter");

// get inputs
// eslint-disable-next-line no-unused-vars
const [_, __, fileIn, style] = process.argv;
const yamlIn = fs.readFileSync(fileIn, {
  encoding: "utf8",
  flag: "r",
});

const rstOut = converter(yamlIn, { style: "normal" });
console.log(rstOut);
