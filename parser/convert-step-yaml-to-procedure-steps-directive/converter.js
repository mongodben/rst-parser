const Yaml = require("yamljs");

function convertYamlStepFileToSnooty(yamlStr, config) {
  const splitRegex = /\n---[\n]+/;
  const yamlStrSteps = yamlStr.split(splitRegex);
  const jsonSteps = yamlStrSteps.map((step) => {
    return Yaml.parse(step);
  });
  const firstLine = ".. procedure::\n";
  const style = config?.style ? `   :style: ${config.style}\n\n` : "\n";

  const steps = jsonSteps.map((step) => {
    const stepTitle = `   .. step:: ${step.title || ""}\n\n`;
    const stepContent = step.content
      .split("\n")
      .map((line) => "      " + line)
      .join("\n");
    return stepTitle + stepContent;
  });

  return firstLine + style + steps.join("\n\n") + "\n\n";
}

module.exports = convertYamlStepFileToSnooty;
