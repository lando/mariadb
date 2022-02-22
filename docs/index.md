---
title: MariaDB Lando Plugin
description: Add a highly configurable MariaDB service to Lando for local development with all the power of Docker and Docker Compose.
---

# MariaDB

[MariaDB](https://mariadb.org/) is a very common database server which is *EXTREMELY* similar to MySQL but has a guarantee of being open source.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/config/services.html) top-level config in your [Landofile](https://docs.lando.dev/config/lando.html).

```yaml
services:
  myservice:
    type: mariadb
```

## Supported versions

*   [10.6](https://hub.docker.com/r/bitnami/mariadb)
*   [10.5](https://hub.docker.com/r/bitnami/mariadb)
*   [10.4](https://hub.docker.com/r/bitnami/mariadb)
*   **[10.3](https://hub.docker.com/r/bitnami/mariadb)** **(default)**
*   [10.2](https://hub.docker.com/r/bitnami/mariadb)
*   [custom](./../config/services.md#advanced)

## Legacy versions

::: warning Using Unsupported MariaDB Versions!
While you can currently use some [EOL MariaDB version](https://endoflife.date/mariadb) with Lando, it's worth noting that we also do not support such versions, so your mileage may vary. If you are having issues with unsupported versions and open a ticket about it, the most likely response you will get is "upgrade to a supported version".
:::

You can still run these versions with Lando but for all intents and purposes they should be considered deprecated (e.g. YMMV and do not expect a ton of support if you have an issue).

*   [10.1](https://hub.docker.com/r/bitnami/mariadb)

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

But make sure you use one of the available [patch tags](https://hub.docker.com/r/bitnami/mariadb/tags) for the underlying image we are using.

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "yarn add @lando/mariadb" line to install a particular version eg
# yarn add @lando/mariadb@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "yarn init -y \
  && yarn add @lando/mariadb --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && yarn install --production --cwd /tmp/node_modules/@lando/mariadb \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/mariadb /plugins/@lando/mariadb"

# Rebuild the plugin cache
lando --clear
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/mariadb
```
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/mariadb`. This command will also show you _where_ the plugin is being loaded from.
