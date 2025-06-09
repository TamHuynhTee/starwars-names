const fs = require("fs");
const notesGenerator = require("@semantic-release/release-notes-generator");

module.exports = {
  branches: ["master"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    [
      "@semantic-release/exec",
      {
        prepareCmd: "scripts/generate-sri.sh ${nextRelease.version}",
      },
    ],
    // Uncomment if you want to commit version bump to package.json
    // [
    //   "@semantic-release/git",
    //   {
    //     assets: ["package.json", "package-lock.json"],
    //     message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
    //   },
    // ],
    [
      "@semantic-release/github",
      {
        assets: ["dist/**/*"],
        addReleases: "bottom",
      },
    ],
  ],
  /**
   * ✅ This must be a top-level key — NOT passed inside plugins[]
   */
  generateNotes: async (pluginConfig, context) => {
    const defaultNotes = await notesGenerator.generateNotes(
      pluginConfig,
      context
    );

    const sriSnippet = fs.existsSync("sri-snippet.txt")
      ? fs.readFileSync("sri-snippet.txt", "utf8").trim()
      : "";

    console.log("--- SRI FILE CONTENT > sri-snippet.txt ---");
    console.log(sriSnippet);

    return `${defaultNotes}\n\n---\n\n🔒 **Subresource Integrity Snippet**\n\n\`\`\`html\n${sriSnippet}\n\`\`\``;
  },
};
