var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:5001/api/users/");

describe("Users", function () {
  it("get username", function (done) {
    server
      .get("getUsername/6275288ab2eaa8d2b3c5deb2")
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});
