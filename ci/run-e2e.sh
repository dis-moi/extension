yarn install --frozen-lockfile

Xvfb :99 -screen 0 1280x800x16 & yarn concurrently -r --kill-others -s first -n profiles,cucumber \
'yarn start:profiles:no-progress' \
'yarn wait-on ./build/development/chromium/ && yarn wait-on http://localhost:8080 && yarn cucumber-js'
