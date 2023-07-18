const { Validator } = require('jsonschema');
const schema = require('./schema.json');

function validateRecipe(data) {
  const validator = new Validator();
  const result = validator.validate(data, schema);

  if (result.valid) {
    console.log('Recipe is valid!');
    console.log('Substrate data:', data.substrate);
    console.log('Upstream version of substrate:', getUpstreamVersion(data.substrate));
  } else {
    console.log('Recipe is invalid:', result.errors);
  }

  return result.valid;
}

function getUpstreamVersion(substrate) {
  // Assuming the upstream version is stored in the "tag" property of the substrate object
  return substrate.tag;
}

const recipeData = {
    "package": {
        "kind": "image",
        "name": "cmake",
        "registry": "github",
        "platforms": [
          "arm64",
          "amd64"
        ]
      },
      "substrate": {
        "registry": "github",
        "name": "rainfall-one/crucible",
        "tag": "latest",
        "needs_auth": true
      },
      "source": {
        "registry": "github",
        "name": "Kitware/CMake",
        "kind": "code",
        "version": {
          "kind": "tag",
          "value": "latest"
        },
        "needs_auth": false
      },
      "actions": [
        "cd CMake",
        "make install",
        "cd ..",
        "rm CMake"
      ]
};

validateRecipe(recipeData);

// const { Validator } = require('jsonschema');
// const schema = require('./schema.json');

// function validateRecipe(data) {
//     const validator = new Validator();
//     const result = validator.validate(data, schema);

//     if (result.valid) {
//         console.log('Recipe is valid!');
//     } else {
//         console.log('Recipe is invalid:', result.errors);
//     }

//     return result.valid;
// }

// const recipeData = {
//     "package": {
//         "kind": "image",
//         "name": "cmake",
//         "registry": "github",
//         "platforms": [
//             "arm64",
//             "amd64"
            
//         ]
//     },
//     "substrate": {
//         "registry": "github",
//         "name": "rainfall-one/crucible",
//         "tag": "latest",
//         "needs_auth": true
//     },
//     "source": {
//         "registry": "github",
//         "name": "Kitware/CMake",
//         "kind": "code",
//         "version": {
//             "kind": "tag",
//             "value": "latest"
//         },
//         "needs_auth": false
//     },
//     "actions": [
//         "cd CMake",
//         "make install",
//         "cd ..",
//         "rm CMake"
//     ]


    
// };

// validateRecipe(recipeData);


// const { Validator } = require('jsonschema');
// const schema = require('./schema.json');

// function validateRecipe(data) {
//   const validator = new Validator();
//   const result = validator.validate(data, schema);

//   if (result.valid) {
//     console.log('Recipe is valid!');
//     console.log('Substrate data:', data.substrate);
//   } else {
//     console.log('Recipe is invalid:', result.errors);
//   }

//   return result.valid;
// }

// const recipeData = {
//     "package": {
//         "kind": "image",
//         "name": "cmake",
//         "registry": "github",
//         "platforms": [
//           "arm64",
//           "amd64"
//         ]
//       },
//       "substrate": {
//         "registry": "github",
//         "name": "rainfall-one/crucible",
//         "tag": "latest",
//         "needs_auth": true
//       },
//       "source": {
//         "registry": "github",
//         "name": "Kitware/CMake",
//         "kind": "code",
//         "version": {
//           "kind": "tag",
//           "value": "latest"
//         },
//         "needs_auth": false
//       },
//       "actions": [
//         "cd CMake",
//         "make install",
//         "cd ..",
//         "rm CMake"
//       ]
// };

// validateRecipe(recipeData);
