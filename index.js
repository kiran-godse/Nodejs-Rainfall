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

    // Parse the JSON content
    const recipe = JSON.parse(jsonContent);

    // Access the properties
    const name = recipe.package.name;
    const tag = recipe.substrate.tag;
    const registry = recipe.substrate.registry;
    const needsAuth = recipe.substrate.needs_auth;

    // Get the upstream version and local version from the image property
    const image = "docker.io/debian:stable-slim";
    const [upstreamVersion] = image.split(":")[1].split("-");
    const [localVersion] = image.split(":")[1].split("-");

    console.log("Upstream Version:", upstreamVersion);
    console.log("Local Version:", localVersion);

    // Print the other values
    console.log("Name:", name);
    console.log("Tag:", tag);
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
