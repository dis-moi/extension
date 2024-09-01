if [[ $(git log --format=%B -n 1) == "chore: release"* ]]; then
  yarn install --immutable
  NODE_ENV=staging FACET=lmel yarn run build:chromium
  NODE_ENV=staging FACET=lmel yarn run upload:chromium
else
  echo "Not a version commit, skipping …"
fi
