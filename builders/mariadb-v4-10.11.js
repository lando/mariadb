'use strict';

// Modules
const _ = require('lodash');
const path = require('path');
// Builder
module.exports = {
  name: 'mariadb-v4-10.11',
  config: {
    supported: ['10.11', '10.10', '10.9', '10.8', '10.7', '10.6', '10.5', '10.4', '10.3', '10.2', '10.1'],
    creds: {
      database: 'database',
      password: 'mariadb',
      user: 'mariadb',
    },
    healthcheck: 'mysql -uroot --silent --execute "SHOW DATABASES;"',
    port: '3306',
    confSrc: __dirname,
    defaultFiles: {
      database: 'my_custom.cnf',
    },
    remoteFiles: {
      database: '/etc/mysql/conf.d',
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
      options.entrypoint = 'docker-entrypoint.sh';
      // Get the base image name.
      const baseImage = options.customImage ? `${options.customImage}:${options.version}` : `mariadb:${options.version}`;

      const mariadb = {
        image: 'mariadb:10.11',
        command: 'mariadbd',
        environment: {
          MARIADB_ALLOW_EMPTY_ROOT_PASSWORD: 'yes',
          // MARIADB_ROOT_PASSWORD
          // MARIADB_RANDOM_ROOT_PASSWORD
          // MARIADB_ROOT_HOST

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
          `${path.resolve(__dirname, '..', 'scripts')}:/scripts`,
          `${options.data}:/var/lib/mysql`,
        ],
        entrypoint: options.entrypoint,
      };

      // Send it downstream
      super(id, options, {services: _.set({}, options.name, mariadb)});
    };
  },
};
