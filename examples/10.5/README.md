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
# Should use 10.5.8 as the default version
lando ssh -s defaults -c "mysql -V | grep 10.5.8"

# Should use the patch version when set by the user
lando ssh -s patch -c "mysql -V | grep 10.5.13"

# Should use the correct default user pass db
lando ssh -s defaults -c "mysql -umariadb -pmariadb database -e quit"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
