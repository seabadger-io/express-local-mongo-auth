const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const passport = require('passport');
const User = require('../../models/user');

let returnUser, returnError;

const defRequest = {
  login: (user, cb) => {
    cb(null);
  },
  logout: sinon.spy(),
  flash: sinon.spy()
};

const defResponse = {
  redirect: sinon.spy()
};

let controller;
let req, res, next;

describe('Local Auth Controller', function () {
  before((done) => {
    sinon.stub(passport, 'authenticate').callsFake((strategy, cb) => {
      let user = returnUser;
      let err = returnError;
      return (req, res, next) => {
        if (typeof cb === 'function') { cb(err, user); };
        if (typeof next === 'function') { next(); };
      };
    });
    
    sinon.stub(User, 'register').callsFake((usr, pass, cb) => {
      let err = returnError;
      cb(err);
    });
    controller = require('../../controllers/auth-local');
    done();
  });
  after((done) => {
    passport.authenticate.restore();
    User.register.restore();
    done();
  });
  beforeEach((done) => {
    req = new Object(defRequest);
    res = new Object(defResponse);
    next = sinon.spy();
    returnUser = undefined;
    returnError = undefined;
    done();
  });
  describe('Login', function () {
    it('should redirect and flash error on failure', (done) => {
      returnUser;
      controller.login(req, res, next);
      expect(res.redirect).to.have.been.calledWith('/');
      expect(req.flash).to.have.been.calledWith('error', 'Login failed');
      done();
    });
    it('should redirect and flash info on success', (done) => {
      returnUser = { email: 'test@test.moc' };
      controller.login(req, res, next);
      expect(res.redirect).to.have.been.calledWith('/');
      expect(req.flash).to.have.been.calledWith('info', 'Login successful');
      done();
    });
    it('should call error handler on error', (done) => {
      returnError = new Error('Test');
      controller.login(req, res, next);
      expect(next.args[0][0]).to.be.an('error');
      expect(next.args[0][0].status).to.equal(400);
      done();
    });
  });
  describe('Register', function () {
    beforeEach((done) => {
      req.body = {};
      req.body.email = 'test@test.moc';
      req.body.password = 'abcdefgh';
      done();
    });
    it('should redirect and flash error on empty password', (done) => {
      req.body.password = '';
      controller.register(req, res, next);
      expect(res.redirect).to.have.been.calledWith('/register');
      expect(req.flash).to.have.been.calledWith('error', 'Password required');
      done();
    });
    it('should redirect and flash error on failure', (done) => {
      returnError = new Error('User already exists');
      controller.register(req, res, next);
      expect(res.redirect).to.have.been.calledWith('/register');
      expect(req.flash).to.have.been.calledWith('error', 'User already exists');
      done();
    });
    it('should redirect and flash info on success', (done) => {
      controller.register(req, res, next);
      expect(res.redirect).to.have.been.calledWith('/');
      expect(req.flash).to.have.been.calledWith('info', 'Registration successful');
      done();
    });
  });
  describe('Logout', function () {
    it('should call request logout', (done) => {
      controller.logout(req, res, next);
      expect(req.logout).to.have.been.called;
      done();
    });
    it('should redirect and flash info', (done) => {
      controller.logout(req, res, next);
      expect(res.redirect).to.have.been.calledWith('/');
      expect(req.flash).to.have.been.calledWith('info', 'Successful logout');
      done();
    });
  });
});
