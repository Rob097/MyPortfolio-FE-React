const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const deps = require("./package.json").dependencies;
const devDeps = require("./package.json").devDependencies;
const parentDeps = require("../../package.json").dependencies;
const parentDevDeps = require("../../package.json").devDependencies;
const webpack = require('webpack');
const getEnvKeys = require('common-lib/environments/utils.js');

module.exports = (_, argv) => {

  const envKeys = getEnvKeys(argv.mode);

  return {
    output: {
      publicPath: "http://localhost:3001/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      // alias: {
      //   '@common-lib': path.resolve(__dirname, '../../shared/common')
      // },
    },

    devServer: {
      port: 3001,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },

    optimization: {
      runtimeChunk: envKeys['process.env.REACT_RUNTIME_CHUNK']
    },

    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.m?js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
        {
          test: /\.json$/,
          exclude: /(node_modules)/,
          loader: "json-loader"
        }
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          auth: `auth@http://localhost:3002/remoteEntry.js`,
          dashboard: `dashboard@http://localhost:3004/remoteEntry.js`,
          context: `context@http://localhost:4201/remoteEntry.js`,
        },
        exposes: {},
        shared: {
          ...parentDeps,
          ...parentDevDeps,
          ...deps,
          ...devDeps,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: parentDeps.react,
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: parentDeps["react-dom"],
          }
        }
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  }
};