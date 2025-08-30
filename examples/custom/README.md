# MariaDB Custom Example

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
# Should use the specfied version when set by the user
lando exec custom -- mysql -V | grep "10.3"

# Should use the specfied version when set by the user
lando exec customimage -- mysql -V | grep "10.6"

# Should use the user provided creds if given
lando exec custom -- mysql -upirog -ppassword stuff -e quit

# Should use the correct default user pass db
lando exec customimage -- mysql -umariadb -pmariadb database -e quit

# Should use a custom config file if specified
lando mysql -e "show variables;" | grep table_open_cache | grep 513
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
