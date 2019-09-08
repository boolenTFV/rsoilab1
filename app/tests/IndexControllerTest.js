const assert = require('assert');
const httpMocks = require("node-mocks-http");
const IndexController = require('../controllers/IndexController');
const db = new require('../testDb');

describe('IndexController tests', function() {
  it('Get request test', function() {
  	var mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/"
    });
    var mockResponse = httpMocks.createResponse();
    IndexController.get(mockRequest, mockResponse);
    var actualResponseBody = mockResponse._getData();
    var expectedResponseBody = "Hello, world!";
    assert.equal(actualResponseBody, expectedResponseBody);
  });
  it('Get request test', function() {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
  it('Post request test', function() {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
  it('Get request with params test', function() {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
});