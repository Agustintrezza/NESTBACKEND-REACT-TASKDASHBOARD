const { override, addDecoratorsLegacy, addWebpackModuleRule } = require('customize-cra');

const addSassLoader = () => (config) => {
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);

  if (oneOfRule) {
    oneOfRule.oneOf.unshift({
      test: /\.scss$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('postcss-preset-env')({
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              }),
            ],
          },
        },
        {
          loader: require.resolve('sass-loader'),
          options: {
            implementation: require('sass'),
          },
        },
      ],
    });
  }

  return config;
};

module.exports = override(
  addDecoratorsLegacy(),
  addSassLoader()
);
