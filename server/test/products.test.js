var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:5001/api/products");

describe("Products", function () {
  it("get products", function (done) {
    server
      .get("/")
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("get product", function (done) {
    server
      .get("/find/6277ee910597b9377c929dd0")
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it("search product", function (done) {
    var query = "a";
    server
      .get("/find?q=" + query)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});
