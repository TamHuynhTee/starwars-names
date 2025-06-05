const config = {
  branches: ["master"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/git",
    "@semantic-release/github",
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        tarballDir: "dist",
        pkgRoot: ".",
        tag: "latest",
      },
    ],
  ],
};

module.exports = config;
