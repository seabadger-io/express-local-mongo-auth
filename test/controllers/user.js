const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const User = require('../../models/user');

let returnUser, returnError;

const defRequest = {
  flash: sinon.spy(),
  params: {}
};

const defResponse = {
  redirect: sinon.spy(),
  json: sinon.spy()
};

const controller = require('../../controllers/user');
let req, res, next;

describe('User Controller', function () {
  before((done) => {
    sinon.stub(User, 'findById').callsFake((id, cb) => {
      cb(returnError, returnUser);
    });
    done();
  });
  after((done) => {
    User.findById.restore();
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
  describe('getUser', function () {
    it('returns user object', (done) => {
      returnUser = { email: 'test@test.moc' };
      req.params['id'] = 1;
      controller.getUser(req, res, next);
      expect(res.json).to.have.been.calledWith(returnUser);
      done();
    });
    it('returns error message with status 404 if not found', (done) => {
      req.params['id'] = 1;
      controller.getUser(req, res, next);
      expect(res.status).to.equal(404);
      expect(res.json).to.have.been.calledWith({ message: 'User not found' });
      done();
    });
  });
});
