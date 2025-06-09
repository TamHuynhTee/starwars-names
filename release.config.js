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
    [
      "@semantic-release/release-notes-generator",
      {
        // You could pass config here if needed
        generateNotes: async (pluginConfig, context) => {
          const defaultNotes = await notesGenerator.generateNotes(
            pluginConfig,
            context
          );

          const sriSnippet = fs.existsSync("sri-snippet.txt")
            ? fs.readFileSync("sri-snippet.txt", "utf8").trim()
            : "";

          return `${defaultNotes}\n\n---\n\n🔒 **Subresource Integrity Snippet**\n\n\`\`\`html\n${sriSnippet}\n\`\`\``;
        },
      },
    ],
    "@semantic-release/npm",
    [
      "@semantic-release/exec",
      {
        successCmd: "scripts/generate-sri.sh ${nextRelease.version}",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "package-lock.json"], // or just "package.json"
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: ["dist/**/*"],
        addReleases: "bottom",
      },
    ],
  ],
};
