if [[ $(git log --format=%B -n 1) == "chore: release"* ]]; then
  echo "version commit, all clear"
else
  yarn install --frozen-lockfile --production=false
  yarn semantic-release
fi
