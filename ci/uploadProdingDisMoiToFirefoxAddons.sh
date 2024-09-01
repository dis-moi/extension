if [[ $(git log --format=%B -n 1) == "chore: release"* ]]; then
  yarn install --immutable
  NODE_ENV=proding FACET=dismoi yarn run build:firefox
  NODE_ENV=proding FACET=dismoi yarn run upload:firefox
else
  echo "Not a version commit, skipping …"
fi
