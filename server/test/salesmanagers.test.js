var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:5001/api/salesmanager/");

describe("Betweendates", function () {
  it("get username", function (done) {
    server
      .get("betweendates")
      .expect(200)
      .send({
        start_date: "Oct 18 2022 12:41:34 GMT+0000 (UTC)",
        end_date: "Oct 18 2023 12:41:34 GMT+0000 (UTC)",
      })
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});
