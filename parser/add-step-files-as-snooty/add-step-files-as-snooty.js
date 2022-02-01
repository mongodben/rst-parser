const fs = require("fs");
const path = require("path");
const convertStepYamlToSnooty = require("../convert-step-yaml-to-snooty");
const { STEP_FILE_INCLUDE } = require("../regex");

function addStepFilesAsSnooty(inputSnooty, pathToStepFilesDir) {
  const rstWithSteps = inputSnooty.replaceAll(
    STEP_FILE_INCLUDE,
    (_, rstFileNameNoExtension) => {
      const yamlFileName = "steps-" + rstFileNameNoExtension + ".yaml";
      const yamlFilePath = path.join(pathToStepFilesDir, yamlFileName);
      const stepFileAsString = convertStepYamlToSnooty(yamlFilePath, {
        underlineChar: "~",
      });
      return stepFileAsString;
    }
  );
  return rstWithSteps;
}

module.exports = addStepFilesAsSnooty;
