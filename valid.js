const Ajv = require('ajv');
const ajvKeywords = require('ajv-keywords');
const schema = require('./schema.json');
const recipeData = require('./recipe.json');

delete schema['$schema'];

const ajv = new Ajv.default({ allErrors: true });
ajvKeywords(ajv, ['regexp']);

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
}

function readRecipe(data) {
    const isValid = validateRecipe(data);
    if (isValid) {
        console.log('Substrate data:', data.substrate);
    }
}

module.exports = {
    validateRecipe,
    readRecipe
};
