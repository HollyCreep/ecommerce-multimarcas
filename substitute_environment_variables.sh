#!/bin/bash
ROOT_DIR=/usr/share/nginx/html
# /*!
#     List all files with .html extension
#     @return list mentioned above
#  */
function getFiles() {
    local files=`find ${ROOT_DIR} -type f -name "*.html"`
    echo "${files}"
}
# /*!
#     List all environment variables with suffix "PLACEHOLDER" in index.html file
#     @return list mentioned above
#  */
function getPlaceholders() {
    local placeholders=`grep -o '\w*\PLACEHOLDER\b' ${ROOT_DIR}/index.html`
    echo "${placeholders}"
}
# /*!
#     Removes "_PLACEHOLDER" suffix in variable value, for future replacement
#     @param placeholder Placeholder value
#     @return variable without suffix
#  */
function removePlaceholderSufix() {
    local placeholder=$1
    local withouthPlaceholder=`echo ${placeholder} | sed 's/_PLACEHOLDER//g'`
    echo "${withouthPlaceholder}"
}
# Execution
files=`getFiles`
placeholders=`getPlaceholders`
for file in ${files}; do
  for placeholder in ${placeholders}; do
    # Remove "*_PLACEHOLDER" suffix
    withouthPlaceholder=`removePlaceholderSufix ${placeholder}`
    # Get environment variable value
    eval "envVarValue=\${${withouthPlaceholder}}"
    # Sed files to change placeholder for environment variable value

    # To handle boolean logic
    if [ "${envVarValue}" == "true" ] || [ "${envVarValue}" == "false" ]; then
      # Remove double qoutes
      sed -i 's|\"'${placeholder}'\"|'${envVarValue}'|g' ${file}
    else
      # Sed files to change placeholder for environment variable value
      sed -i 's|'${placeholder}'|'${envVarValue}'|g' ${file}
    fi
  done
done
# Starting NGINX
nginx -g 'daemon off;'
