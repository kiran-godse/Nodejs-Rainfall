const core = require('@actions/core');
const fs = require('fs');
const Ajv = require('ajv');

try {
  const recipeFilePath = core.getInput('recipe-file');
  const recipeContent = fs.readFileSync(recipeFilePath, 'utf8');
  const recipe = JSON.parse(recipeContent);

  const schemaFilePath = '.schema/recipe.json';
  const schemaContent = fs.readFileSync(schemaFilePath, 'utf8');
  const schema = JSON.parse(schemaContent);

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(recipe);

  if (!valid) {
    core.setFailed('Recipe validation failed. Errors: ' + JSON.stringify(validate.errors));
  } else {
    core.setOutput('recipe-properties', JSON.stringify(recipe));
  }
} catch (error) {
  core.setFailed('An error occurred: ' + error.message);
}
