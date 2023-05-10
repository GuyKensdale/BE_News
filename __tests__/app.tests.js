app = require("../app");
seed = require("../db/seeds/seed");
testData = require("../db/data/test-data/index");
const request = require("supertest");
const connection = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return connection.end();
});

describe("/api/topics", () => {
  test("GET - status:200 - get array of topics with the properties of slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics.length).toBe(3);
        expect(typeof res.body).toEqual("object");
        const topics = res.body.topics;
        topics.forEach((topics) => {
          expect(topics).hasOwnProperty("description");
          expect(typeof topics.description).toBe("string");
        });
      });
  });
  test("get api/non-valid path should return 404", () => {
    return request(app)
      .get("/api/invalid")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Not Found");
      });
  });
});
describe("GET api ", () => {
  test("GET - API should return a json with all the available end points ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(typeof res.body).toEqual("object");
        expect(res.get("content-type")).toMatch(/application\/json/);
      });
  });
});
