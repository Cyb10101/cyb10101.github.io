#!/usr/bin/env bash

SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd "${SCRIPTPATH}"

APPLICATION_UID=${APPLICATION_UID:-1000}
APPLICATION_GID=${APPLICATION_GID:-1000}
APPLICATION_USER=${APPLICATION_USER:-application}
APPLICATION_GROUP=${APPLICATION_GROUP:-application}

loadEnvironmentVariables() {
    if [ -f ".env" ]; then
      source .env
    fi
    if [ -f ".env.local" ]; then
      source .env.local
    fi
}

loadEnvironmentVariables

startFunction() {
    case ${1} in
        server)
            /usr/local/bin/hugo server --baseURL http://127.0.0.1/ --bind 0.0.0.0 \
            --buildDrafts --buildExpired --buildFuture --cleanDestinationDir --disableFastRender --i18n-warnings
        ;;
        build)
            /usr/local/bin/hugo --cleanDestinationDir --i18n-warnings
        ;;
        version)
            /usr/local/bin/hugo version
        ;;
        *)
            /usr/local/bin/hugo "${@:1}"
        ;;
    esac
}

startFunction "${@:1}"
exit $?
