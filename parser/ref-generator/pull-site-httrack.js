const util = require("util");
const exec = util.promisify(require("child_process").exec);

// wrapper around Httracker (https://www.httrack.com/page/2/)
// must have Httracker installed
async function pullSiteHttrack(startUrl, dirOut, matchPattern) {
  console.log("depending on size of your site, this may take a while...");
  console.log(
    "this would be a good time to grab some coffee, or even take lunch"
  );
  await exec(`httrack "${startUrl}" -O "${dirOut}" "${matchPattern}" -v`);
}

module.exports = pullSiteHttrack;
