/**
 * @jest-environment node
 */

const request = require('supertest');
// const fetch = require('node-fetch');
const { app, server } = require('../../server/server');

describe('Route integration', () => {
  beforeAll(() => {
    server.listen(3000);
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  describe('GET /', () => {
    it('responds with 200 status and text/html content type', async () => {
      await request(app)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });
  });

  //   describe('GET /trails', () => {
  //     it('responds with json and status 200', async () => {
  //       const lat = 20;
  //       const lon = -20;
  //       const radius = 20;

  //       const response = await request(app)
  //         .get(
  //           `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lon}&radius=${radius}`
  //         )
  //         .set('Accept', 'application/json');
  //       expect(response.statusCode).toBe(200);
  //     });
  //   });
});
