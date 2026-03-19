import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.city.inpinity.online/graphql',
  documents: ['src/lib/queries.ts'],
  generates: {
    './src/types/generated/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        strictScalars: true,
        scalars: {
          BigInt: 'string',
          Bytes: 'string',
          BigDecimal: 'string',
          Int8: 'string',
          Timestamp: 'string',
        },
        namingConvention: {
          enumValues: 'keep', // <-- wichtig, um Duplikate zu vermeiden
        },
        allowPartialOutput: true,
        skipValidation: true,
        validationRules: [],
      },
    },
    './src/types/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  ignoreNoDocuments: true,
  allowPartialResults: true,
};

export default config;