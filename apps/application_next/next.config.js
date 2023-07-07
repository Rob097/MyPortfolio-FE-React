/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/* const deps = require("./package.json").dependencies;
const devDeps = require("./package.json").devDependencies;
const parentDeps = require("../../package.json").dependencies;
const parentDevDeps = require("../../package.json").devDependencies;
const getEnvKeys = require('common-lib/environments/utils');
const envKeys = getEnvKeys('development'); */


module.exports = {
    reactStrictMode: true,
    webpack(config, options) {
        Object.assign(config.experiments, { topLevelAwait: true });

        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'remote',
                    remotes: {
                        context: 'context@http://localhost:4201/remoteEntry.js',
                    },
                    exposes: {
                        './nextjs-remote-component': './components/nextjs-remote-component.js',
                    },
                    shared: {},
                    filename: 'static/chunks/remoteEntry.js'
                }),
            );
        }
        return config;
    },
};


/*
const nextConfig = {

    webpack: (config, options) => { // webpack configurations
        if (!options.isServer) {
            config.plugins.push(
                new options.webpack.container.ModuleFederationPlugin({
                    name: "application_next",
                    filename: "static/chunks/remoteEntry.js", // remote file name which will used later
                    remoteType: "var",
                    exposes: { // expose all component here.
                        "./page": "./src/app/test/page"
                    },
                    shared:
                    {
                        ...parentDeps,
                        ...parentDevDeps,
                        ...deps,
                        ...devDeps,
                        react: {
                            singleton: true,
                            requiredVersion: parentDeps.react,
                        },
                        "react-dom": {
                            singleton: true,
                            requiredVersion: parentDeps["react-dom"],
                        }
                    },

                })
            ),
            config.output.publicPath = "http://localhost:3000/_next/";
        }
        // Add the optimization configuration here
        config.optimization = {
            splitChunks: false,
        };
        return config
    },

    env: envKeys,

    reactStrictMode: true
}

module.exports = nextConfig;*/


/*
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;
const devDeps = require("./package.json").devDependencies;
const parentDeps = require("../../package.json").dependencies;
const parentDevDeps = require("../../package.json").devDependencies;
const webpack = require("webpack");
const getEnvKeys = require("common-lib/environments/utils");

module.exports = (phase, { defaultConfig }) => {
    const envKeys = getEnvKeys(defaultConfig.mode);

    return {
        reactStrictMode: true,

        webpack: (config, { isServer }) => {
            config.resolve.extensions.push(".tsx", ".ts", ".jsx", ".js", ".json");

            config.module.rules.push(
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
                    enforce: "pre",
                    use: ["source-map-loader"],
                },
                {
                    test: /\.json$/,
                    exclude: /(node_modules)/,
                    loader: "json-loader",
                }
            );

            if (!isServer) {
                config.plugins.push(
                    new ModuleFederationPlugin({
                        name: "application",
                        filename: "remoteEntry.js",
                        remotes: {},
                        exposes: {
                            "./App": "./src/app/test/page",
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
                        },
                    })
                );
            }

            return config;
        },

        async headers() {
            return [
                {
                    source: "/(.*)",
                    headers: [
                        {
                            key: "Access-Control-Allow-Origin",
                            value: "*",
                        },
                        {
                            key: "Access-Control-Allow-Methods",
                            value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                        },
                        {
                            key: "Access-Control-Allow-Headers",
                            value: "X-Requested-With, content-type, Authorization",
                        },
                    ],
                },
            ];
        },

        async rewrites() {
            return [
                {
                    source: "/remoteEntry.js",
                    destination: "http://localhost:3003/remoteEntry.js",
                },
            ];
        },

        async redirects() {
            return [
                {
                    source: "/",
                    destination: "/",
                    permanent: true,
                },
            ];
        },

        env: envKeys,

        // You can add other Next.js config options here as needed.

        // For example:
        // basePath: '/your-base-path',
        // assetPrefix: '/your-asset-prefix',

        // Or any other Next.js configuration options you require.

        ...nextConfig
    };
};
*/