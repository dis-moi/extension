if [[ $(git log --format=%B -n 1) == "chore: release"* ]]; then
  echo "version commit, all clear"
else
  yarn semantic-release
fi
