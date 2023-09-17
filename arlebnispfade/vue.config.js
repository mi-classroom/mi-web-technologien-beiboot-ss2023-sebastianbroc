module.exports = {
  devServer: {
    https: false
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/mi-web-technologien-beiboot-ss2023-sebastianbroc/"
      : "/"
};
