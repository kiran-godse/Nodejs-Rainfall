const Ajv2020 = require("ajv/dist/2020");
const core = require("@actions/core");
const fs = require("fs");
const addFormats = require("ajv-formats");
const ajvKeywords = require("ajv-keywords");

const ajv = new Ajv2020();
addFormats(ajv);
ajvKeywords(ajv);

try {
  // Read the JSON file path from the input
  const jsonFilePath = core.getInput("json-file");

  // Read the JSON file content
  const jsonContent = fs.readFileSync(jsonFilePath, "utf8");

  // Read the schema file path from the input
  const schemaFilePath = core.getInput("schema-file");

  // Read the schema file content
  const schemaContent = fs.readFileSync(schemaFilePath, "utf8");

  const validate = ajv.compile(JSON.parse(schemaContent));

  // Perform validation using the compiled schema
  const valid = validate(JSON.parse(jsonContent));

  if (!valid) {
    console.log("Validation errors:", validate.errors);
    core.setFailed("JSON content is not valid according to the schema");
  } else {
    console.log("JSON content is valid according to the schema");
  }

  // Log the JSON content
  console.log("JSON Content:", jsonContent);

  // Set the JSON content as an output
  core.setOutput("json", jsonContent);
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`);
}
