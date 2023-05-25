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
        expect(typeof res.body).toEqual("object");
        expect(res.get("content-type")).toMatch(/application\/json/);
        expect(res.body).toHaveProperty("GET /api/articles");
        expect(res.body).toHaveProperty("GET /api/topics");
      });
  });
});
describe("GET api/articles/ID ", () => {
  test("GET articles by id should return article from ID ", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        const output = res.body.articles[0];
        expect(output).toHaveProperty("author");
        expect(output).toHaveProperty("title");
        expect(output).toHaveProperty("article_id");
        expect(output).toHaveProperty("body");
        expect(output).toHaveProperty("topic");
        expect(output).toHaveProperty("created_at");
        expect(output).toHaveProperty("votes");
        expect(output).toHaveProperty("article_img_url");
        expect(output.article_id).toEqual(1);
      });
  });
  test("GET articles by id should return article with correct properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        const output = res.body.articles[0];
        expect(output.author).toEqual(expect.any(String));
        expect(output.title).toEqual(expect.any(String));
        expect(output.body).toEqual(expect.any(String));
        expect(output.topic).toEqual(expect.any(String));
        expect(output.created_at).toEqual(expect.any(String));
        expect(output.article_img_url).toEqual(expect.any(String));
        expect(output.article_id).toEqual(expect.any(Number));
        expect(output.votes).toEqual(expect.any(Number));
      });
  });
  test("GET articles by id should return article with properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        const output = res.body.articles[0];
        expect(output.author).toEqual(expect.any(String));
        expect(output.title).toEqual(expect.any(String));
        expect(output.body).toEqual(expect.any(String));
        expect(output.topic).toEqual(expect.any(String));
        expect(output.created_at).toEqual(expect.any(String));
        expect(output.article_img_url).toEqual(expect.any(String));
        expect(output.article_id).toEqual(expect.any(Number));
        expect(output.votes).toEqual(expect.any(Number));
      });
  });
  test("GET articles by id should return a 404 and msg of 'no such article !' if id is not in the db", () => {
    return request(app)
      .get("/api/articles/90")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("No such article !");
      });
  });
});
describe("GET api/article", () => {
  test("GET API/article should return an array of article objects ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;
        expect(articles.length > 0);
        articles.forEach((article) => {
          expect(typeof article).toEqual("object");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
        });
      });
  });

  test("GET articles with correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;
        expect(articles.length > 0);
        articles.forEach((article) => {
          expect(article.author).toEqual(expect.any(String));
          expect(article.title).toEqual(expect.any(String));
          expect(article.body).toEqual(expect.any(String));
          expect(article.topic).toEqual(expect.any(String));
          expect(article.created_at).toEqual(expect.any(String));
          expect(article.article_img_url).toEqual(expect.any(String));
          expect(article.article_id).toEqual(expect.any(Number));
          expect(article.votes).toEqual(expect.any(Number));
        });
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("GET article comments with correct data type ", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const output = res.body.comments[0];
        expect(output.author).toEqual(expect.any(String));
        expect(output.created_at).toEqual(expect.any(String));
        expect(output.article_id).toEqual(expect.any(Number));
        expect(output.comment_id).toEqual(expect.any(Number));
        expect(output.votes).toEqual(expect.any(Number));
      });
  });
  test("GET article comments with no comments", () => {
    return request(app)
      .get("/api/articles/8/comments")
      .expect(200)
      .then((res) => {
        const output = res.body.comments;
        expect(output).toEqual([]);
      });
  });
  test("GET article comments should return 400 if article_id is not a number", () => {
    return request(app)
      .get("/api/articles/not-a-number/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid article_id");
      });
  });

  test("GET article comments should return 404 if article_id does not exist", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Article not found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("POST comments should post a comment by given user to selected article", () => {
    const newComment = {
      username: "rogersop",
      body: "This is a new comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((res) => {
        expect(res.body.comment[0]).toHaveProperty("comment_id");
        expect(res.body.comment[0]).toHaveProperty(
          "author",
          newComment.username
        );
        expect(res.body.comment[0]).toHaveProperty("body", newComment.body);
        expect(res.body.comment[0]).toHaveProperty("created_at");
        expect(res.body.comment[0]).toHaveProperty("votes", 0);
      });
  });
  test("POST comments should throw err when request is done wrong missing body ", () => {
    const newComment = {
      username: "rogersop",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("No comment body provided!");
      });
  });

  test("POST comments should throw err when request is done wrong , missing username ", () => {
    const newComment = {
      body: "This is a new comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid username");
      });
  });
  test("POST comments should throw err when request is done wrong , incorrect username ", () => {
    const newComment = {
      username: "3423424",
      body: "This is a new comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Username does not exist!");
      });
  });
  test("POST comments should throw err when request is done wrong , missing id ", () => {
    const newComment = {
      username: "rogersop",
      body: "This is a new comment",
    };
    return request(app)
      .post("/api/articles//comments")
      .send(newComment)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });
  test("POST comments should throw err when request is done wrong , invalid id ", () => {
    const newComment = {
      username: "rogersop",
      body: "This is a new comment",
    };
    return request(app)
      .post("/api/articles/45345435/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid article ID!");
      });
  });
});
describe("/api/articles/:article_id", () => {
  test("PATCH /api/articles/:article_id - successful update", () => {
    const newVote = { inc_votes: 1 };
    return request(app)
      .patch(`/api/articles/1`)
      .send(newVote)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("article");
        expect(res.body.article.votes).toBe(101);
      });
  });

  test("PATCH /api/articles/:article_id - article not found", () => {
    const newVote = { inc_votes: 1 };
    return request(app)
      .patch(`/api/articles/9999`)
      .send(newVote)
      .expect(404)
      .then((res) => {
        expect(res.body).toHaveProperty("msg", "Article not found");
      });
  });
  test("PATCH /api/articles/:article_id - missing inc_votes field", () => {
    return request(app)
      .patch(`/api/articles/3`)
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("msg", "Invalid inc_votes value");
      });
  });

  test("PATCH /api/articles/:article_id - inc_votes with non-numeric value", () => {
    const newVote = { inc_votes: "a" };
    return request(app)
      .patch(`/api/articles/4`)
      .send(newVote)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("msg", "Invalid inc_votes value");
      });
  });
});
