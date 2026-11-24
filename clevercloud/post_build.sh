#!/bin/bash
set -euo pipefail

# Builds the site for Clever Cloud.
#
# Clever installs the dependencies but runs no compilation step: it has to be
# triggered here. This hook runs after the installation and before the archive
# is cached, so its result is reused from one deployment to the next.
#
# To be declared on the application:
#   CC_POST_BUILD_HOOK=./clevercloud/post_build.sh
#
# https://www.clever.cloud/developers/doc/develop/build-hooks/

yarn build
