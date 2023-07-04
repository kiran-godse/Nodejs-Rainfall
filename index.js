const core = require('@actions/core');
const fs = require('fs');
const Ajv = require('ajv');

try {
  // Read the JSON file path from the input
  const jsonFilePath = core.getInput('json-file');

  // Read the JSON file content
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');

  // Read the schema file path from the input
  const schemaFilePath = core.getInput('schema-file');

  // Read the schema file content
  const schemaContent = fs.readFileSync(schemaFilePath, 'utf8');

  // Parse the JSON schema
  const schema = JSON.parse(schemaContent);

  // Create an instance of AJV
  const ajv = new Ajv();

  // Compile the schema
  const validate = ajv.compile(schema);

  // Validate the JSON content against the schema
  const isValid = validate(JSON.parse(jsonContent));

  if (isValid) {
    // Log the JSON content
    console.log('JSON Content:', jsonContent);

    // Set the JSON content as an output
    core.setOutput('json', jsonContent);
  } else {
    // If validation fails, set an error
    core.setFailed('Invalid JSON file. Validation failed.');
  }
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`);
}
