module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@styles': './src/styles',
          '@stores': './src/stores',
          '@models': './src/models',
        },
      },
    ],
  ],
};
