if [[ $(git log --format=%B -n 1) == "chore: release"* ]]; then
  NODE_ENV=staging FACET=dismoi yarn run upload:firefox
else
  echo "Not a version commit, skipping …"
fi
