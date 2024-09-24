MariaDB Example
===============

This example exists primarily to test the following documentation:

* [MariaDB Service](https://docs.devwithlando.io/tutorials/mariadb.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use 11.4.2 as the default version
lando ssh -s database -c "mariadb -V | grep 11.4.2"

# Should use the correct default user pass db
lando ssh -s database -c "mariadb -umariadb -pmariadb database -e quit"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
