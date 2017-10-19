const secrets = require('./secrets');

module.exports = {
  db: {
    // uri: 'mongodb://' + secrets.db.user + ':' + secrets.db.pass + '@' + localhost/express-auth'
    uri: 'mongodb://localhost/express-auth'
  },
  session: {
    secret: secrets.session.secret
  },
  http: {
    enabled: true,
    port: 8080
  },
  https: {
    enabled: true,
    port: 8443,
    crt: 'config/cert/server.crt',
    key: 'config/cert/server.key',
    passphrase: secrets.https.passphrase
  }
};

