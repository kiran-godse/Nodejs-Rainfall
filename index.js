const core = require('@actions/core');
const fs = require('fs');

try {
  // Get the path to the JSON file from the input
  const jsonFilePath = core.getInput('json-file');

  // Read the JSON file
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');

  // Parse the JSON data
  const data = JSON.parse(jsonData);

  // Extract the desired properties
  const substrateTag = data.substrate.tag;
  const substrateName = data.substrate.name;
  const substrateRegistry = data.substrate.registry;
  const substrateAuth = data.substrate.auth;

  // Set the outputs
  core.setOutput('substrate-tag', substrateTag);
  core.setOutput('substrate-name', substrateName);
  core.setOutput('substrate-registry', substrateRegistry);
  core.setOutput('substrate-auth', substrateAuth);
} catch (error) {
  core.setFailed(error.message);
}
