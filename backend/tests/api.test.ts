// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { describe, it } from 'node:test';
// import app from '../index';

// chai.use(chaiHttp);
// chai.should();

// const expect = chai.expect
import request from 'supertest';
import { expect } from 'chai';
import app from '../src/index';

describe("End to end test", () => {
    it("should create a poll", async () => {
      const newPoll = { 
        title: "testTitle",
        options: ["a", "b", "c", "d"]
       };
      const response = await request(app)
        .post('/api/createPoll')
        .send(newPoll);
  
      expect(response.status).to.equal(200);
      // expect(response.body).to.deep.equal({
      //   message: 'Item created successfully',
      //   item: newItem,
      // });
    })
});