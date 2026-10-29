# MariaDB 12.3 Example

This example exists primarily to test the following documentation:

* [MariaDB Service](https://docs.lando.dev/plugins/mariadb)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should use 12.3.3 as the default version
lando exec database -- mariadb -V | grep 12.3.3

# Should use the official mariadb image
docker inspect landomariadb123_database_1 --format '{{ .Config.Image }}' | grep "^mariadb:12.3.3$"

# Should use the patch version when set by the user
lando exec patch -- mariadb -V | grep 12.3.2

# Should use the correct default user pass db
lando exec database -- mariadb -umariadb -pmariadb database -e quit

# Should allow passwordless root access
lando exec database -- mariadb -uroot -e quit

# Should store data in the persistent datadir
lando exec database -- mariadb -uroot -e "SELECT @@datadir;" | grep /var/lib/mysql/data/

# Should use the lando default config
lando exec database -- mariadb -uroot -e "SHOW VARIABLES LIKE 'max_allowed_packet';" | grep 33554432

# Should use the user provided creds if given
lando exec custom -- mariadb -upirog -ppassword stuff -e quit

# Should use a custom config file if specified
lando exec custom -- mariadb -uroot -e "SHOW VARIABLES LIKE 'table_open_cache';" | grep 513

# Should provide mysql compat commands
lando exec database -- mysql -umariadb -pmariadb database -e quit
lando exec database -- mysqldump --version | grep 12.3.3

# Should be able to export the database
lando exec database -- mariadb -umariadb -pmariadb database -e "CREATE TABLE lando (id INT); INSERT INTO lando VALUES (123);"
lando db-export-test --stdout | grep "INSERT INTO \`lando\` VALUES"

# Should persist data across rebuilds
lando rebuild -y
lando exec database -- mariadb -umariadb -pmariadb database -e "SELECT id FROM lando;" | grep 123
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
