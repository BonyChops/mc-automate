import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const common: Configuration = {
  mode: isDev ? "development" : "production",
  externals: ["fsevents"],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  output: {
    publicPath: "./",
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ico|png|svg|eot|woff?2?)$/,
        type: "asset/resource",
      },
    ],
  },
  watch: isDev,
  devtool: isDev ? "source-map" : undefined,
};

const main: Configuration = {
  ...common,
  target: "electron-main",
  entry: { main: "./src/main.ts" },
};

const preload: Configuration = {
  ...common,
  target: "electron-preload",
  entry: { preload: "./src/preload.ts" },
};

const renderer: Configuration = {
  ...common,
  target: "web",
  entry: { app: "./src/web/index.tsx" },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: "./src/web/index.html" }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "public"),
        },
        {
          from: path.join(
            __dirname,
            "node_modules",
            "scratch-blocks",
            "*_compressed*.js"
          ),
          context: path.join(
            __dirname,
            "node_modules",
            "scratch-blocks",
          ),
          to: path.join(__dirname, "dist", "js", "scratch"),
        },
        {
          from: path.join(
            __dirname,
            "node_modules",
            "scratch-blocks",
            "msg",
            "js",
            "en.js"
          ),
          to: path.join(__dirname, "dist", "js", "scratch", "msg", "js"),
        },
        {
          from: path.join(
            __dirname,
            "node_modules",
            "scratch-blocks",
            "blocks_vertical"
          ),
          context: path.join(
            __dirname,
            "node_modules",
            "scratch-blocks",
          ),
          to: path.join(__dirname, "dist", "js", "scratch", "blocks_vertical"),
        },
        {
          from: path.join(
            __dirname,
            "node_modules",
            "scratch-blocks",
            "blocks_common"
          ),
          context: path.join(
            __dirname,
            "node_modules",
            "scratch-blocks",
          ),
          to: path.join(__dirname, "dist", "js", "scratch", "blocks_common"),
        },
        {
          from: path.join(
            __dirname,
            "node_modules",
            "scratch-blocks",
            "media"
          ),
          context: path.join(
            __dirname,
            "node_modules",
            "scratch-blocks",
            "media"
          ),
          to: path.join(__dirname, "dist", "media"),
        }
      ],
    }),
  ],
};

export default [main, preload, renderer];
