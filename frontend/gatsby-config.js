module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-styletron",
      options: {
        prefix: "_",
        debug: false,
      },
    },
  ],
};
