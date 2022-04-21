const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    reactapp: "./app/assets/javascripts/reactapp.jsx"
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', {targets: "defaults"}]
            ]
          }
        }
      }
    ]
  }
}
