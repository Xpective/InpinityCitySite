import { existsSync } from "node:fs";
import type { CodegenConfig } from "@graphql-codegen/cli";

const LOCAL_SCHEMA_CANDIDATES = [
  "./root-schema.json",
  "./src/types/generated/schema.graphql",
];

const localSchema = LOCAL_SCHEMA_CANDIDATES.find((candidate) => existsSync(candidate));
const remoteSchema =
  process.env.CODEGEN_SCHEMA_URL?.trim() ||
  process.env.VITE_SUBGRAPH_URL?.trim() ||
  "https://api.city.inpinity.online/graphql";

const schema = localSchema || remoteSchema;

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
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  overwrite: true,
  ignoreNoDocuments: true,
};

export default config;
