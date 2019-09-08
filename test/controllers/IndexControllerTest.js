const assert = require('assert');
const httpMocks = require("node-mocks-http");
const IndexController = require('../../app/routes/Index');
const Person = require('../../app/models/Person');
const dbman = require('../testDb');


function buildResponce(){
  return httpMocks.createResponse(
    {eventEmitter: require('events').EventEmitter}
  );
}

describe('IndexController tests', function() {

  const testEntities = [
    {name:"Max", age:30}, {name:"Tom", age:25}
  ];
  beforeEach(function(){
      return dbman.saveTestEnities(Person,testEntities);
    }
  );
  afterEach(function(){
      return dbman.clear(Person);
    }
  );

  it('/GET test', (done) =>{
  	var mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/"
    });
    var mockResponse = buildResponce();
    mockResponse.on('end', function() {
      var actualResponseBody = mockResponse._getData();
      var expectedResponseBody = JSON.stringify(testEntities);
      assert.equal(actualResponseBody, expectedResponseBody);
      done();
    });
    IndexController.handle(mockRequest, mockResponse);
  });

  it('/GET whith params', (done) =>{
    var mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/",
      query:{name:'Max'}
    });
    var mockResponse = buildResponce();
    mockResponse.on('end', function() {
      var actualResponseBody = mockResponse._getData();
      var expectedResponseBody = JSON.stringify([testEntities[0]]);
      assert.equal(actualResponseBody, expectedResponseBody);
      done();
    });
    IndexController.handle(mockRequest, mockResponse);
  });


  it('/POST', (done) =>{
    this.timeout(1000);
    var mockRequest = httpMocks.createRequest({
      method: "POST",
      url: "/",
      body:{name:'Alex', age:'200'}
    });
    var mockResponse = buildResponce();
    mockResponse.on('end', function() {
      var actualResponseBody = mockResponse._getData();
      var expectedResponseBody = JSON.stringify([testEntities[0]]);
      Person.find({name:'Alex'},{_id:0,name:1, age:1}, function(err,doc){
        if(err){
          throw err;
        }
        if(doc){
          done();
        }else{
          throw 'User is not added';
        }
      });
    });
    IndexController.handle(mockRequest, mockResponse);
  });
});
