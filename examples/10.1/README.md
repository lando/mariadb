# MariaDB 10.1 Example

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
# Should use 10.1.47 as the default version
lando exec defaults -- mysql -V | grep 10.1.47

# Should use the patch version when set by the user
lando exec patch -- mysql -V | grep 10.1.45

# Should use the correct default user pass db
lando exec defaults -- mysql -umariadb -pmariadb database -e quit
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
