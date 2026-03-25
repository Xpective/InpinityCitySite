import { existsSync } from "node:fs";
import type { CodegenConfig } from "@graphql-codegen/cli";

const remoteSchema =
  process.env.CODEGEN_SCHEMA_URL?.trim() ||
  process.env.VITE_SUBGRAPH_URL?.trim() ||
  "https://api.city.inpinity.online/graphql";

// Wichtig:
// root-schema.json in diesem Repo ist nur ein Debug-Dump und KEIN vollständiges
// Introspection-Schema. Deshalb hier bewusst nicht verwenden.
const schema = existsSync("./src/types/generated/schema.graphql")
  ? "./src/types/generated/schema.graphql"
  : remoteSchema;

const config: CodegenConfig = {
  schema,
  documents: ["src/lib/queries.ts"],
  generates: {
    "./src/types/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        strictScalars: true,
        useTypeImports: true,
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
      config: {
        includeDirectives: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  overwrite: true,
  ignoreNoDocuments: true,
};

export default config;