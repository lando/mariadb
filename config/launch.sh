#!/bin/bash

# Errors and logz
set -e

# Detect and run the correct entrypoint script. THANKS BITNAMI!
if [ -f "/opt/bitnami/scripts/mariadb/entrypoint.sh" ]; then
  /opt/bitnami/scripts/mariadb/entrypoint.sh /opt/bitnami/scripts/mariadb/run.sh
elif [ -f "/usr/local/bin/docker-entrypoint.sh" ]; then
  # Official images no longer ship the mysql* compat binaries but lando tooling and users expect them
  for bin in mysql mysqldump mysqladmin mysqlcheck mysqlimport mysqlshow mysqlbinlog mysql_upgrade; do
    # eg mysql -> mariadb, mysqldump -> mariadb-dump, mysql_upgrade -> mariadb-upgrade
    suffix="${bin#mysql}"
    suffix="${suffix#_}"
    mbin="mariadb${suffix:+-$suffix}"
    if ! command -v "$bin" >/dev/null && command -v "$mbin" >/dev/null; then
      ln -sf "$(command -v "$mbin")" "/usr/local/bin/$bin"
    fi
  done

  # Use the same datadir layout as bitnami so older data can be upgraded in place
  exec /usr/local/bin/docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data
else
  /entrypoint.sh /run.sh
fi
