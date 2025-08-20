module.exports = {
  branches: ["main"],
  tagFormat: "v${version}",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/exec",
      {
        // Create a file named "release-<version>" containing the version
        prepareCmd:
          'node -e "require(\'fs\').writeFileSync(`release-${process.argv[1]}`, process.argv[1])" ${nextRelease.version}',
      },
    ],
    [
      "@semantic-release/git",
      {
        // Commit the generated file with a custom message
        assets: ["release-*"],
        message: "chore(release): v${nextRelease.version}",
      },
    ],
    [
      "@semantic-release/github",
      {
        successCommentCondition: false,
        failComment: false,
        releasedLabels: false,
      },
    ],
  ],
};
