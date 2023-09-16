import request from 'supertest';
import { expect } from 'chai';
import app from '../src/index';
let pollId = "";
describe("End to end test", () => {
  it("Create a poll", async () => {
    const newPoll = {
      title: "testTitle",
      options: ["a", "b", "c", "d"]
    };
    const response = await request(app)
      .post('/api/createPoll')
      .send(newPoll);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.deep.property("id")
    pollId = response.body.id;
    expect(response.body).to.have.deep.property("createdAt")
    expect(response.body).to.have.deep.property("title").to.equal("testTitle")
    expect(response.body).to.have.deep.property("options").to.equal(["a", "b", "c", "d"])
    expect(response.body).to.have.deep.property("isLive")
  })

  it("Fetch an existing poll", async () => {

    const response = await request(app).get(`/api/getPoll?pollId=${pollId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.deep.property("id")
    expect(response.body).to.have.deep.property("createdAt")
    expect(response.body).to.have.deep.property("title").to.equal("testTitle")
    expect(response.body).to.have.deep.property("options").to.equal([{"count": 0,"title": "a"},{ "count": 0, "title": "b"}, { "count": 0, "title": "c" },{ "count": 0, "title": "d" }])
    expect(response.body).to.have.deep.property("isLive").to.equal(true)
  })

  it("Vote in a poll", async () => {
    let response = await request(app).post(`/api/addVote`).send({pollId, "pollOption": 1});
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
        "pollId": pollId,
        "pollOption": 1,
        "count": 1
    })

    response = await request(app).get(`/api/getPoll?pollId=${pollId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.deep.property("id")
    expect(response.body).to.have.deep.property("createdAt")
    expect(response.body).to.have.deep.property("title").to.equal("testTitle")
    expect(response.body).to.have.deep.property("options").to.equal([{"count": 0,"title": "a"},{ "count": 1, "title": "b"}, { "count": 0, "title": "c" },{ "count": 0, "title": "d" }])
    expect(response.body).to.have.deep.property("isLive").to.equal(true)
  })

  it("Forbid voting more than once in a poll", async () => {
  const response = await request(app).post(`/api/addVote`).send({pollId, "pollOption": 2});
    expect(response.status).to.equal(403);
    expect(response.body).to.deep.equal({
        "error": "Forbidden",
        "msg": "You have already voted!",
        "pollOption": 1
    });
  })
});