const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;

const defRequest = {
  flash: sinon.spy()
};

const defResponse = {
  redirect: sinon.spy()
};

const controller = require('../../controllers/session');
let req, res, next;

describe('Session Controller', function () {
  beforeEach((done) => {
    req = new Object(defRequest);
    res = new Object(defResponse);
    next = sinon.spy();
    done();
  });
  describe('isAuthenticated', function () {
    it('should redirect and flash error if not authenticated', (done) => {
      controller.isAuthenticated(req, res, next);
      expect(res.redirect).to.have.been.calledWith('/');
      expect(req.flash).to.have.been.calledWith('error', 'You are not logged in');
      done();
    });
    it('should call next() if authenticated', (done) => {
      req.user = { email: 'test@test.moc' };
      controller.isAuthenticated(req, res, next);
      expect(next).to.have.been.calledWithExactly();
      done();
    });
  });
});
