module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando MariaDB Plugin Documentation',
  base: '/mariadb/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/mariadb/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/mariadb/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: '@lando/vuepress-theme-default-plus',
  themeConfig: {
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/mariadb',
    sidebarHeader: {
      enabled: true,
      title: 'MariaDB Plugin',
      icon: '/images/mariadbicon.png',
    },
    sidebar: [
      {
        text: 'Getting Started',
        link: '/index.md',
      },
      '/config.md',
      '/support.md',
      {text: 'Examples', link: 'https://github.com/lando/mariadb/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/mariadb/releases'},
      '/development.md',
    ],
  },
};
