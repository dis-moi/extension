# MacOS

## Setup the machine

Create a machine user with remote ssh access
Open port for the machine to be reachable from the outside.
Set up authorized key to login programmatically
Add bully ssh keys to be able to clone git repository.

Install __ohmyzsh__:
```
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Install __homebrew__:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Or allow the group to write to homebrew directories if already installed by another user:
```
sudo chmod -R g+w /opt/homebrew/*
```

Add `/opt/homebrew/bin/` to your path:
```
sudo nano /etc/paths
```

Install `yarn`:
```
brew install yarn
```

## Build for Safari
```
yarn build:safari:production
xcrun safari-web-extension-converter --bundle-identifier io.dismoi.extension --force --no-prompt --copy-resources --project-location . --app-name DisMoi build/production/safari
```

Update __Safari__ repository:
```
cd DisMoi
git init
git remote add origin git@github.com:dis-moi/extension-safari.git
git fetch
git reset origin/main
git checkout -t origin/main
git add .
git commit -m "update build"
git push origin HEAD
```
