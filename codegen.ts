import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.WORDPRESS_API_URL || 'https://cms.fradfoundation.org/graphql',
  documents: ['lib/wordpress.ts', 'components/**/*.tsx'],
  generates: {
    'types/graphql-generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
      ],
      config: {
        skipTypename: false,
        withHooks: false,
        scalars: {
          DateTime: 'string',
          JSON: 'Record<string, unknown>',
        },
      },
    },
  },
};

export default config;
