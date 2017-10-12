module.exports = {
  db: {
    url: 'mongodb://localhost/multi-auth'
  },
  http: {
    enabled: true,
    port: 8080
  },
  https: {
    enabled: true,
    port: 8443,
    crt: 'config/cert/server.crt',
    key: 'config/cert/server.key'
  }
};
