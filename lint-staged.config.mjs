export default {
  "*": () => [
    "pnpm --filter web format:check",
    "pnpm exec prettier --check package.json pnpm-workspace.yaml .commitlintrc.json lint-staged.config.mjs docker-compose.yml .github/workflows/ci.yml",
  ],
};
