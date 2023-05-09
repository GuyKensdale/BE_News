app = require("../app");
seed = require("../db/seeds/seed");
testData = require("../db/data/test-data/index");
connection = require("../db/connection");
const request = require("supertest");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => connection.end());

describe("/api/topics", () => {
  test.only("GET - status:200 - get array of topics with the properties of slug and description", () => {
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
});
