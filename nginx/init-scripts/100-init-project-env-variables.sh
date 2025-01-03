#!/usr/bin/env sh

set -ex

project_env_variables=$(ls -t /usr/share/nginx/html/assets/chunks/project-env-variables-*.js | head -n1)

envsubst < "$project_env_variables" > ./project_env_variables_temp
cp ./project_env_variables_temp "$project_env_variables"
rm ./project_env_variables_temp