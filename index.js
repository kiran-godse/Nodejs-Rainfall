const Ajv = require('ajv');
const ajvKeywords = require('ajv-keywords');
const schema = require('./schema.json'); // Assuming the schema.json and recipe.json files are in the same directory
const recipeData = require('./recipe.json');
//Remove the $schema keyword from the schema
delete schema['$schema'];

const ajv = new Ajv.default({ allErrors: true });
ajvKeywords(ajv, ['regexp']);

validateRecipe(recipeData);
readRecipe(recipeData);


function validateRecipe(data) {
    const validate = ajv.compile(schema);
    const isValid = validate(data);

    if (isValid) {
        console.log('Recipe is valid!');

        //  console.log('Substrate data:', data.substrate);
    } else {
        console.log('Recipe is invalid:', validate.errors);
    }

    return isValid;


};

function readRecipe(data) {
    const isValid = validateRecipe(data);
    if (isValid) {
        // const recipeData = JSON.parse(data);
        console.log('Substrate data:', data.substrate);

    }
}
