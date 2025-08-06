#!/bin/sh

echo "Injecting env vars into env.js"

sed -i "s|__REACT_APP_API_URL__|${REACT_APP_API_URL}|g" /usr/share/nginx/html/env.js
sed -i "s|__REACT_APP_APP_URL__|${REACT_APP_APP_URL}|g" /usr/share/nginx/html/env.js

exec "$@"