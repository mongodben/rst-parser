const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { PROJECT_DIR } = require("../../settings");

async function rstToMd(inputRst) {
  const tempDir = path.join(PROJECT_DIR, "tmp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  try {
    const tempRstFilePath = path.join(tempDir, Date.now().toString() + ".rst");
    fs.writeFileSync(tempRstFilePath, inputRst);
    const args = `pandoc ${tempRstFilePath} -f rst -t gfm --standalone`;
    const { stdout, stderr } = await exec(args);
    if (stderr) throw new Error(stderr);
    return stdout;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    // md conversion clean up
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
module.exports = rstToMd;
