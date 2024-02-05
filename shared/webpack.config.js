const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const webpack = require('webpack');
const deps = require("./package.json").dependencies;
const devDeps = require("./package.json").devDependencies;
const parentDeps = require("../package.json").dependencies;
const parentDevDeps = require("../package.json").devDependencies;

module.exports = (env, argv) => {

  var dotenv = require('dotenv').config({ path: __dirname + '/.env.' + (argv.mode || 'development') });

  let runtimeChunk;
  if (dotenv.parsed.REACT_APP_RUNTIME_CHUNK === "true" || dotenv.parsed.REACT_APP_RUNTIME_CHUNK === "false") {
    runtimeChunk = dotenv.parsed.REACT_APP_RUNTIME_CHUNK === "true";
  } else {
    runtimeChunk = dotenv.parsed.REACT_APP_RUNTIME_CHUNK;
  }

  return {
    output: {
      publicPath: `${dotenv.parsed.REACT_APP_SHARED_URL}/`,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {
        '@': path.resolve(__dirname, 'src/')
      },
    },

    devServer: {
      port: dotenv.parsed.REACT_APP_SHARED_PORT,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },

    optimization: {
      runtimeChunk: runtimeChunk
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
          loader: "json-loader"
        },
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          options: { allowTsInNodeModules: true }
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "shared",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./stores/Store": "./src/stores/Store",
          "./stores/AuthStore": "./src/stores/AuthStore",
          "./stores/DashboardStore": "./src/stores/DashboardStore",
          "./i18n": "./src/i18n/i18n",
          "./pages/ErrorPages": "./src/pages/ErrorPages",
          "./theme": "./src/theme/index",
          "./utilities/constants": "./src/utilities/constants",
          "./utilities/criteria": "./src/utilities/criteria.model.ts",
          "./utilities/functions/boxShadow": "./src/utilities/functions/boxShadow",
          "./utilities/functions/gradientChartLine": "./src/utilities/functions/gradientChartLine",
          "./utilities/functions/hexToRgb": "./src/utilities/functions/hexToRgb",
          "./utilities/functions/linearGradient": "./src/utilities/functions/linearGradient",
          "./utilities/functions/pxToRem": "./src/utilities/functions/pxToRem",
          "./utilities/functions/rgba": "./src/utilities/functions/rgba"
        },
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
          },
        }
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new webpack.DefinePlugin(dotenv.parsed)
    ]
  }
};