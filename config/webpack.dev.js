const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@https://azwebappgithubworkflow.z13.web.core.windows.net/marketing/latest/remoteEntry.js',
        auth: 'auth@https://azwebappgithubworkflow.z13.web.core.windows.net/auth/latest/remoteEntry.js',
        dashboard: 'dashboard@https://azwebappgithubworkflow.z13.web.core.windows.net/dashboard/latest/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
