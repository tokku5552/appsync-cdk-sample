import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../schemas/schema.graphql",
  documents: "./graphql/**/*.graphql",
  generates: {
    "./src/types/generated/generated-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "named-operations-object",
      ],
    },
  },
};

export default config;
