const Ajv2020 = require("ajv/dist/2020");
const core = require("@actions/core");
const fs = require("fs");

const ajv = new Ajv2020();

try {
  // Read the JSON file path from the input
  const jsonFilePath = core.getInput("json-file");

  // Read the JSON file content
  const jsonContent = fs.readFileSync(jsonFilePath, "utf8");

  // Read the schema file path from the input
  const schemaFilePath = core.getInput("schema-file");

  // Read the schema file content
  const schemaContent = fs.readFileSync(schemaFilePath, "utf8");

  // Compile the schema
  const validate = ajv.compile(JSON.parse(schemaContent));

  // Validate the JSON content against the schema
  const valid = validate(JSON.parse(jsonContent));

  if (valid) {
    console.log("Validation successful");
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
