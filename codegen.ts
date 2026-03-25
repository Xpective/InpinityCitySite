import type { CodegenConfig } from "@graphql-codegen/cli";

const useRemoteSchema = process.env.CODEGEN_USE_REMOTE === "1";

const config: CodegenConfig = {
  schema: useRemoteSchema
    ? "https://api.city.inpinity.online/graphql"
    : "./root-schema.json",
  documents: ["src/**/*.{ts,tsx}", "!src/types/generated/**"],
  overwrite: true,
  generates: {
    "./src/types/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        strictScalars: true,
        scalars: {
          BigInt: "string",
          Bytes: "string",
          BigDecimal: "string",
          Int8: "string",
          Timestamp: "string",
        },
        namingConvention: {
          enumValues: "keep",
        },
      },
    },
    "./src/types/generated/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  ignoreNoDocuments: true,
};

export default config;
