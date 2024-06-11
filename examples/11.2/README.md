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
# Should use 11.2.4 as the default version
lando ssh -s defaults -c "mariadb -V | grep 11.2.4"

# Should use the patch version when set by the user
lando ssh -s patch -c "mariadb -V | grep 11.2.3"

# Should use the correct default user pass db
lando ssh -s defaults -c "mariadb -umariadb -pmariadb database -e quit"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
