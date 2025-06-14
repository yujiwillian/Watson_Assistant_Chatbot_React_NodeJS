const request = require('supertest');

const app = require('../../src/app');

describe('assistant', () => {
    it('should not accept missing arguments on session route', async () => {
        const response = await request(app).get('/api/v1/assistant/session');
        expect(response.status).toBe(400);
    });

    it('should not accept missing token argument on message route', async () => {
        const headers = {
            assistantid: 'some-id',
            sessionid: 'some-sessionid',
        };
        const response = await request(app)
            .post('/api/v1/assistant/message')
            .set(headers);
        expect(response.status).toBe(400);
    });

    it('should not accept missing session argument on message route', async () => {
        const headers = {
            assistantid: 'some-id',
            token: 'Bearer some-token',
        };
        const response = await request(app)
            .post('/api/v1/assistant/message')
            .set(headers);
        expect(response.status).toBe(400);
    });

    it('should not accept missing assistantid argument on message route', async () => {
        const headers = {
            token: 'Bearer some-token',
            sessionid: 'some-sessionid',
        };
        const response = await request(app)
            .post('/api/v1/assistant/message')
            .set(headers);
        expect(response.status).toBe(400);
    });

    it('should have input message at body on message route', async () => {
        const headers = {
            assistantid: 'some-id',
            token: 'Bearer some-token',
            sessionid: 'some-sessionid',
        };
        const response = await request(app)
            .post('/api/v1/assistant/message')
            .set(headers);
        expect(response.status).toBe(400);
    });
});
