const print = (...args) => console.log(...args);
const fs = require("fs");

const raw = require("./roles-raw.json");
const formatted = {};
Object.keys(raw).forEach((key) => {
  const type = raw[key]?.type;
  if (type && typeof type.link === "string") {
    formatted[key] = type["link"];
  }
});

fs.writeFileSync("roles.json", JSON.stringify(formatted));
