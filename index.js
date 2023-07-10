const Ajv2020 = require("ajv/dist/2020");
const core = require("@actions/core");
const fs = require("fs");

const ajv = new Ajv2020({ strictTypes: false });

// Add the `allowUnionTypes` option to the Ajv instance
ajv.opts.allowUnionTypes = true;

try {
  // Read the JSON file path from the input
  const jsonFilePath = core.getInput("json-file");

	try {
    console.log("Registry:", registry);
    console.log("NeedsAuth:", needsAuth);

    // Set the JSON content as an output
    core.setOutput("json", jsonContent);
  } else {
    console.log("Validation failed");
    console.log(validate.errors);
    core.setFailed("Validation failed. Please check the JSON content against the schema.");
  }
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`);
}
