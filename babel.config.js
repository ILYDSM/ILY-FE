module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/screen': './src/screen',
            '@/navigations': './src/navigations',
            '@/components': './src/components',
          },
        },
      ],
    ],
  };
};
