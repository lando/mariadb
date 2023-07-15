'use strict';

// Modules
const fs = require('fs');
const generator = require('dockerfile-generator');
const _ = require('lodash');
const path = require('path');

// Builder
module.exports = {
  name: 'mariadb-v4',
  config: {
    image: 'mariadb',
    // supported: 'v4', @todo: interpret this in core as allowing all versions
    supported: ['10.11', '10.10', '10.9', '10.8', '10.7', '10.6', '10.5', '10.4', '10.3', '10.2', '10.1'],
    //legacy: ['10.1'],
    patchesSupported: true,
    confSrc: __dirname,
    creds: {
      database: 'database',
      password: 'mariadb',
      user: 'mariadb',
    },
    healthcheck: 'mysql -uroot --silent --execute "SHOW DATABASES;"',
    port: '3306',
    defaultFiles: {
      database: 'my_custom.cnf',
    },
    remoteFiles: {
      database: '/opt/bitnami/mariadb/conf/my_custom.cnf',
    },
  },
  parent: '_service-v4',
  builder: (parent, config) => class LandoMariaDb extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Ensure the non-root backup perm sweep runs
      // NOTE: we guard against cases where the UID is the same as the bitnami non-root user
      // because this messes things up on circle ci and presumably elsewhere and _should_ be unncessary
      if (_.get(options, '_app._config.uid', '1000') !== '1001') options._app.nonRoot.push(options.name);

      options.entrypoint = 'docker-entrypoint.sh';

      // Detect version of MariaDB

      // Create a Dockerfile.
      // Could start with a Dockerfile that literally just references the bitnami image.
      // Move all items necessary for context into /tmp folder (Dockerfile, Lando helper scripts) namespaced by app/servicename.
      const tmpDir = `/tmp/${options.project}/${options.name}`;
      fs.mkdirSync(tmpDir, { recursive: true });
      fs.cpSync(path.resolve(__dirname, '..', 'scripts'), tmpDir, {recursive: true});
      fs.cpSync(path.resolve(__dirname, 'my_custom.cnf'), `${tmpDir}/config/my_custom.cnf`, {recursive: true});

      // @todo: make another key to switch to a different operating system...will require flexibility in our scripts.
      // @todo: how to allow users to use their own custom image that uses the mysql base image we use?
      // -> Separate out the image name from pattern lando-service:repository/org/image-name:tage
      const imageFile = {
        from: {baseImage: `${options.image}:${options.version}`},
        copy: {
          '*.sh': '/',
          'config/my_custom.cnf': '/etc/mysql/conf.d/my_custom.cnf',
        },
        run: '/setup.sh',
        env: {
          MARIADB_ALLOW_EMPTY_ROOT_PASSWORD: 'yes',
          // MARIADB_EXTRA_FLAGS for things like coallation?
          MARIADB_DATABASE: options.creds.database,
          MYSQL_DATABASE: options.creds.database,
          MARIADB_PASSWORD: options.creds.password,
          MARIADB_USER: options.creds.user,
          LANDO_NEEDS_EXEC: 'DOEEET',
        },
        entrypoint: options.entrypoint,
        cmd: 'mariadbd',
      };

      const mariadb = {
        command: 'mariadbd',
        build: tmpDir,
        volumes: [
          `${options.confDest}/${options.defaultFiles.database}:${options.remoteFiles.database}`,
          `${options.data}:/var/lib/mysql`,
        ],
      };
      // Send it downstream
      super(id, options, imageFile, {services: _.set({}, options.name, mariadb)});
    };
  },
};
