module.exports = {
    "$schema": "https://docs.renovatebot.com/renovate-schema.json",
    repositories: [
        "mhintzke/renovate-rule-merging"
    ],
    onboarding: false,
    requireConfig: 'optional',
    platform: 'github',
    extends: [
        "config:recommended",
        "group:allNonMajor"
    ],
    recreateWhen: "always",
    branchPrefix: "deps/",
    commitMessagePrefix: "[BOT]",
    packageRules: []
}