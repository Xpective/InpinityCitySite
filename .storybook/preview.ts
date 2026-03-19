import type { Preview } from '@storybook/react';
import '../src/styles/global.css';

// Custom Theme für Storybook
import { create } from '@storybook/theming/create';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#0a0e1a' },
      { name: 'light', value: '#ffffff' },
    ],
  },
};

// Globaler Dekorateur für Layout und Context
export const decorators = [
  (Story) => (
    <div style={{ padding: '2rem', background: '#0a0e1a', minHeight: '100vh' }}>
      <Story />
    </div>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;