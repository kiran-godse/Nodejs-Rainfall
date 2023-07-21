const { validateRecipe, readRecipe } = require('./validation');
const recipeData = require('./recipe.json');

describe('validateRecipe', () => {
    test('valid recipe data should return true', () => {
        const isValid = validateRecipe(recipeData);
        expect(isValid).toBe(true);
    });

    test('invalid recipe data should return false', () => {
        const invalidRecipeData = { invalid: 'data' };
        const isValid = validateRecipe(invalidRecipeData);
        expect(isValid).toBe(false);
    });

    // Add more test cases as needed for different scenarios.
});

describe('readRecipe', () => {
    // Mock console.log to capture its output during testing
    let consoleLogMock;

    beforeEach(() => {
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleLogMock.mockRestore();
        jest.clearAllMocks(); // Clear all mocked calls after each test case.
    });

    test('valid recipe data should log the substrate data', () => {
        readRecipe(recipeData);
        expect(consoleLogMock).toHaveBeenCalledWith('Substrate data:', recipeData.substrate);
    });

    test('invalid recipe data should not log the substrate data', () => {
        const invalidRecipeData = { invalid: 'data' };
        readRecipe(invalidRecipeData);
        expect(consoleLogMock).not.toHaveBeenCalled();
    });

    // Add more test cases as needed for different scenarios.
});
