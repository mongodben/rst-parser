const fs = require("fs");
const Yaml = require("yamljs");

function convertYamlStepFileToSnooty(yamlFilePath, config) {
  if (config?.useStepsDirective) {
    throw new Error("TODO: will implement at future point");
  }
  const headerUnderlineChar = config?.underlineChar || "-";

  const yamlFile = fs.readFileSync(yamlFilePath, {
    encoding: "utf8",
    flag: "r",
  });
  const splitRegex = /\n---[\n]+/;
  const yamlStrSteps = yamlFile.split(splitRegex);
  const jsonSteps = yamlStrSteps.map((step) => {
    return Yaml.parse(step);
  });
  const pureRstSteps = jsonSteps.map((step, i) => {
    const stepNum = i + 1;
    const title = stepNum.toString() + ". " + step.title;
    const titleUnderline = new Array(title.length)
      .fill(headerUnderlineChar)
      .join("");
    return `
${title}
${titleUnderline}

${step.content}
    `.trim();
  });
  return pureRstSteps.join("\n\n");
}

module.exports = convertYamlStepFileToSnooty;
