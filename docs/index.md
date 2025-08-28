---
title: MariaDB Lando Plugin
description: Add a highly configurable MariaDB service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# MariaDB

[MariaDB](https://mariadb.org/) is a very common database server which is *EXTREMELY* similar to MySQL but has a guarantee of being open source.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/core/v3/services/lando.html) top-level config in your [Landofile](https://docs.lando.dev/core/v3).

```yaml
services:
  myservice:
    type: mariadb
```

## Supported versions

*   [11.4](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=11.4.)
*   [10.11](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.11.)
*   [10.6](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.6.)
*   [10.5](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.5.)
*   **[10.3](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.3.)** **(default)**
*   [custom](https://docs.lando.dev/core/v3/services/lando.html#overrides)

## Legacy versions

::: warning Using Unsupported MariaDB Versions!
While you can currently use some [EOL MariaDB version](https://endoflife.date/mariadb) with Lando, it's worth noting that we also do not support such versions, so your mileage may vary. If you are having issues with unsupported versions and open a ticket about it, the most likely response you will get is "upgrade to a supported version".
:::

You can still run these versions with Lando but for all intents and purposes they should be considered deprecated (e.g. YMMV and do not expect a ton of support if you have an issue).

*   [11.7](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=11.7.)
*   [11.6](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=11.6.)
*   [11.5](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=11.5.)
*   [11.3](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=11.3.)
*   [11.2](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=11.2.)
*   [11.1](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=11.1.)
*   [11.0](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=11.0.)
*   [10.10](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.10.)
*   [10.9](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.9.)
*   [10.8](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.8.)
*   [10.7](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.7.)
*   [10.4](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.4.)
*   [10.2](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.2.)
*   [10.1](https://hub.docker.com/r/bitnamilegacy/mariadb/tags?name=10.1.)

## Patch versions

::: warning Not officially supported!
While we allow users to specify patch versions for this service, they are not *officially* supported, so if you use one, YMMV.
:::

To use a patch version, you can do something as shown below:

```yaml
services:
  myservice:
    type: mariadb:10.2.21
```

But make sure you use one of the available [patch tags](https://hub.docker.com/r/bitnamilegacy/mariadb/tags) for the underlying image we are using.

