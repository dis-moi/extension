if [[ $(git log --format=%B -n 1) == "chore: release"* ]]; then
  NODE_ENV=staging FACET=lmel yarn run upload:chromium
else
  echo "Not a version commit, skipping …"
fi
