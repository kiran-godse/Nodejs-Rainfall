const Ajv = require('ajv').default;

const schema = {
  "title": "Flow Definition",
  "description": "A DSL for configuring Github Workflows to create Rainfall artefacts.",
  "type": "object",
  "$defs": {
    "auth_check": {
      "description": "Is authentication needed? Credentials are automatically extracted from Secrets in order to ensure security. Please ensure the Secrets are populated by an Org. Owner.",
      "type": "boolean",
      "default": false
    },
    "platform_enum": {
      "type": "string",
      "enum": [
        "arm64",
        "arm32",
        "amd64",
      ]
    },
    "registry_enum": {
      "type": "string",
      "enum": [
        "github",
        "docker",
        "amazon",
        "microsoft",
        "google",
        "redhat",
        "jfrog"
      ]
    },
    "output_kind_enum": {
      "type": "string",
      "enum": [
        "image",
        "tarball"
      ]
    }
  },
  "properties": {
    "package": {
      "description": "The output package that is created from the definition and uploaded to a registry.",
      "type": "object",
      "properties": {
        "kind": {
          "$ref": "#/$defs/output_kind_enum",
          "default": "image"
        },
        "name": {
          "description": "The name of the package.",
          "type": "string",
          "minLength": 3
        },
        "registry": {
          "$ref": "#/$defs/registry_enum",
          "default": "github"
        },
        "platforms": {
          "type": "array",
          "uniqueItems": true,
          "description": "The target platforms for the output package.",
          "items": {
            "$ref": "#/$defs/platform_enum"
          }
        }
      }
    }
  }
};

function validateData(data) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  if (isValid) {
    console.log('Data is valid!');
  } else {
    console.log('Data is invalid:', validate.errors);
  }

  return isValid;
}

const yourData = {
  package: {
    kind: "image",
    name: "example-package",
    registry: "github",
   platforms: ["arm64", "amd64","xyz"]
  }
};

validateData(yourData);
