const Ajv2020 = require("ajv/dist/2020");
const core = require("@actions/core");
const fs = require("fs");
const fetch = require('node-fetch');

const ajv = new Ajv2020({ strictTypes: false });

// Add the `allowUnionTypes` option to the Ajv instance
ajv.opts.allowUnionTypes = true;

async function getLatestVersion(repository) {
  try {
    const response = await fetch(`https://registry.hub.docker.com/v2/repositories/${repository}/tags`);
    const data = await response.json();
    
    if (response.status === 200) {
      const tags = data.results.map(tag => tag.name);
      const latestVersion = tags.sort().pop(); // Assuming tags follow a standard versioning scheme

      return latestVersion;
    } else {
      throw new Error(`Failed to fetch tags for ${repository}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

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

    // Print the values
    console.log("Name:", name);
    console.log("Tag:", tag);
    console.log("Registry:", registry);
    console.log("NeedsAuth:", needsAuth);

    // Fetch the latest version of the base image from the repository
    const repository = 'rainfall-one/vulcan';
    getLatestVersion(repository)
      .then(latestVersion => {
        if (latestVersion) {
          console.log(`Latest version of ${repository}: ${latestVersion}`);
        } else {
          console.log(`Failed to retrieve the latest version of ${repository}`);
        }
      })
      .catch(error => {
        console.error(error);
      });

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
