'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

// Builder
module.exports = {
  name: 'mariadb',
  config: {
    version: '10.3',
    supported: ['11.7', '11.6', '11.5', '11.4', '11.3', '11.2', '11.1',
      '11.0', '10.11', '10.10', '10.9', '10.8', '10.7', '10.6', '10.5',
      '10.4', '10.3', '10.2', '10.1'],
    legacy: ['11.7', '11.6', '11.5', '11.3', '11.2', '11.1', '11.0',
      '10.10', '10.9', '10.8', '10.7', '10.4', '10.3', '10.2', '10.1'],
    pinPairs: {
      '11.7': 'bitnamilegacy/mariadb:11.7.2-debian-12-r0',
      '11.6': 'bitnamilegacy/mariadb:11.6.2-debian-12-r0',
      '11.5': 'bitnamilegacy/mariadb:11.5.2-debian-12-r7',
      '11.4': 'bitnamilegacy/mariadb:11.4.7-debian-12-r2',
      '11.3': 'bitnamilegacy/mariadb:11.3.2-debian-12-r9',
      '11.2': 'bitnamilegacy/mariadb:11.2.6-debian-12-r2',
      '11.1': 'bitnamilegacy/mariadb:11.1.6-debian-12-r0',
      '11.0': 'bitnamilegacy/mariadb:11.0.6-debian-12-r0',
      '10.11': 'bitnamilegacy/mariadb:10.11.11-debian-12-r11',
      '10.10': 'bitnamilegacy/mariadb:10.10.7-debian-11-r6',
      '10.9': 'bitnamilegacy/mariadb:10.9.8-debian-11-r22',
      '10.8': 'bitnamilegacy/mariadb:10.8.8-debian-11-r5',
      '10.7': 'bitnamilegacy/mariadb:10.7.8-debian-11-r6',
      '10.6': 'bitnamilegacy/mariadb:10.6.20-debian-12-r2',
      '10.5': 'bitnamilegacy/mariadb:10.5.27-debian-12-r2',
      '10.4': 'bitnamilegacy/mariadb:10.4.34-debian-12-r7',
      '10.3': 'bitnamilegacy/mariadb:10.3.39-debian-11-r5',
      '10.2': 'bitnamilegacy/mariadb:10.2.44-debian-11-r9',
      '10.1': 'bitnamilegacy/mariadb:10.1.47',
    },
    patchesSupported: true,
    confSrc: path.resolve(__dirname, '..', 'config'),
    creds: {
      database: 'database',
      password: 'mariadb',
      user: 'mariadb',
    },
    port: '3306',
    defaultFiles: {
      database: 'my_custom.cnf',
    },
    remoteFiles: {
      database: '/opt/bitnami/mariadb/conf/my_custom.cnf',
    },
  },
  parent: '_service',
  builder: (parent, config) => class LandoMariaDb extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Ensure the non-root backup perm sweep runs
      // NOTE: we guard against cases where the UID is the same as the bitnami non-root user
      // because this messes things up on circle ci and presumably elsewhere and _should_ be unncessary
      if (_.get(options, '_app._config.uid', '1000') !== '1001') options._app.nonRoot.push(options.name);

      if (!options.healthcheck) options.healthcheck = require('../utils/get-default-healthcheck')(options);

      const mariadb = {
        image: `bitnamilegacy/mariadb:${options.version}`,
        command: '/launch.sh',
        environment: {
          ALLOW_EMPTY_PASSWORD: 'yes',
          // MARIADB_EXTRA_FLAGS for things like coallation?
          MARIADB_DATABASE: options.creds.database,
          MYSQL_DATABASE: options.creds.database,
          MARIADB_PASSWORD: options.creds.password,
          MARIADB_USER: options.creds.user,
          LANDO_NEEDS_EXEC: 'DOEEET',
        },
        volumes: [
          `${options.confDest}/launch.sh:/launch.sh`,
          `${options.confDest}/${options.defaultFiles.database}:${options.remoteFiles.database}`,
          `${options.data}:/bitnami/mariadb`,
        ],
      };

      // Send it downstream
      super(id, options, {services: _.set({}, options.name, mariadb)});
    };
  },
};
