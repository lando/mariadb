# MariaDB Tooling Example

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
# Should not see deprecation warning on db-export
lando db-export-test --stdout | grep -vz "Deprecated"
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
