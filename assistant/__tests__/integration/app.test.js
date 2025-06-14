const request = require('supertest');

const app = require('../../src/app');

describe('app', () => {
    it('should be up and running', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});
