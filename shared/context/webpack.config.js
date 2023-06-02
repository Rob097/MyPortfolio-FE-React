const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const deps = require("./package.json").dependencies;
const webpack = require('webpack');
const getEnvKeys = require('../../shared/common/environments/utils.js');

module.exports = (_, argv) => {

  const envKeys = getEnvKeys(argv.mode);

  return {
    output: {
      publicPath: "http://localhost:3004/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {
        '@common-lib': path.resolve(__dirname, '../../shared/common'),
      },
    },

    devServer: {
      port: 3004,
      historyApiFallback: true,
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
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "context",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./Store": "./src/Store",
          "./ErrorHandler": "./src/ErrorHandler"
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
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