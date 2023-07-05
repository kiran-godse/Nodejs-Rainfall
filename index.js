import Ajv2019 from "ajv/dist/2019.js"
const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const addFormats = require("ajv-formats");
const ajvKeywords = require("ajv-keywords");
//const AjvKeywords = require('ajv-keywords');

const ajv = new Ajv2019()
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
  //const schema_user = require("./schema_user.json")
  const validate = ajv.getSchema(jsonContent)
    || ajv.compile(schemaContent);

  console.log("Validate", validate)
  // const schema = JSON.parse(schemaContent);
  // //const validate = ajv.compile(schema);
  // const valid = validate(data)

  // Perform validation using your chosen JSON schema library
  // Replace this section with your own validation logic

  // Log the JSON content
  console.log("JSON Content:", jsonContent);

  // Set the JSON content as an output
  core.setOutput("json", jsonContent);
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`);
}
