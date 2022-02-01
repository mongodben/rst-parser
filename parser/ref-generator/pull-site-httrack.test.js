const pullSiteHttrack = require("./pull-site-httrack");

pullSiteHttrack(
  "https://docs.mongodb.com/realm/",
  "realm-test-out",
  "+*docs.mongodb.com/realm/*"
);
