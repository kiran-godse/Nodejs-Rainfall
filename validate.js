const Ajv = require('ajv');
const ajvKeywords = require('ajv-keywords');
const schema = require('./schema.json');
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
        return true;
    } else {
        console.log('Recipe is invalid:', validate.errors);
        return false;
    }
};

function readRecipe(data) {
    if (validateRecipe(data)) {
        console.log('Substrate data:', data.substrate);
    } 
}


// Export the functions so they can be used in other files
module.exports = {
    validateRecipe,
    readRecipe
};