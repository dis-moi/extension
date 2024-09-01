if [[ $(git log --format=%B -n 1) == "chore: release"* ]]; then
  echo "version commit, all clear"
else
  yarn install --immutable
  yarn semantic-release
fi
