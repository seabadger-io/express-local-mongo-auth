const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const request = require('supertest');
const express = require('express');

const controller = require('../../controllers/user');
const session = require('../../controllers/session');
//const usersRouter = require('../../routes/users');
let usersRouter;

const dummyMw = (req, res, next) => {
  res.status = 200;
  res.end('ok');
};

const app = express();

describe('Users Router', () => {
  before((done) => {
    sinon.stub(session, 'isAuthenticated').callsFake((req, res, next) => { return next(); });
    sinon.stub(controller, 'getUser').callsFake(dummyMw);
    sinon.stub(controller, 'getUsers').callsFake(dummyMw);
    sinon.stub(controller, 'getSelf').callsFake(dummyMw);
    usersRouter = require('../../routes/users');
    app.use('/', usersRouter);
    done();
  });
  after((done) => {
    session.isAuthenticated.restore();
    controller.getUser.restore();
    controller.getUsers.restore();
    controller.getSelf.restore();
    done();
  });
  it('GET / is protected', (done) => {
    request(app)
      .get('/')
      .expect(200, () => {
        expect(session.isAuthenticated).to.have.been.called;
        done();
      });
  });
  it('GET /:id is protected', (done) => {
    request(app)
      .get('/1')
      .expect(200, () => {
        expect(session.isAuthenticated).to.have.been.called;
        done();
      });
  });
  it('GET /self is protected', (done) => {
    request(app)
      .get('/self')
      .expect(200, () => {
        expect(session.isAuthenticated).to.have.been.called;
        done();
      });
  });
});
