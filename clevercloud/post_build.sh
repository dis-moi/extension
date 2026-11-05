#!/bin/bash
set -euo pipefail

# Construit le site pour Clever Cloud.
#
# Clever installe les dépendances mais ne lance aucune étape de compilation :
# il faut la déclencher soi-même. Ce hook s'exécute après l'installation et
# avant la mise en cache de l'archive, donc son résultat est réutilisé d'un
# déploiement à l'autre.
#
# À déclarer sur l'application :
#   CC_POST_BUILD_HOOK=./clevercloud/post_build.sh
#
# https://www.clever.cloud/developers/doc/develop/build-hooks/

yarn build
