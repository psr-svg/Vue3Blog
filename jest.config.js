export default {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    testEnvironment: 'jsdom',
    "testEnvironmentOptions": {
      "customExportConditions": ["node", "node-addons"]
    },
  };