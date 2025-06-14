const request = require('supertest');

const app = require('../../../src/app');

describe('Create session route', () => {
    it('should not accept missing token argument', async () => {
        const headers = {
            assistantid: 'some-id',
            sessionid: 'some-sessionid',
        };
        const response = await request(app)
            .post('/api/v1/assistant/session')
            .set(headers);
        expect(response.status).toBe(400);
    });

    it('should not accept missing assistantid argument', async () => {
        const headers = {
            token: 'Bearer some-token',
            sessionid: 'some-sessionid',
        };
        const response = await request(app)
            .post('/api/v1/assistant/session')
            .set(headers);
        expect(response.status).toBe(400);
    });
});

describe('Delete session route', () => {
    it('should not accept missing token argument', async () => {
        const headers = {
            assistantid: 'some-id',
            sessionid: 'some-sessionid',
        };
        const response = await request(app)
            .delete('/api/v1/assistant/session')
            .set(headers);
        expect(response.status).toBe(400);
    });

    it('should not accept missing assistantid argument', async () => {
        const headers = {
            token: 'Bearer some-token',
            sessionid: 'some-sessionid',
        };
        const response = await request(app)
            .delete('/api/v1/assistant/session')
            .set(headers);
        expect(response.status).toBe(400);
    });

    it('should not accept missing session argument', async () => {
        const headers = {
            assistantid: 'some-id',
            token: 'Bearer some-token',
        };
        const response = await request(app)
            .delete('/api/v1/assistant/session')
            .set(headers);
        expect(response.status).toBe(400);
    });
});
