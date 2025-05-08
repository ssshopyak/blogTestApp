module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@constants': './src/constants',
          '@components': './src/components',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@navigations': './src/navigations',
          '@stores': './src/stores',
          '@models': './src/models',
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@redux': './src/redux',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      },
    ],
    'react-native-reanimated/plugin', // завжди останній
  ],
};
