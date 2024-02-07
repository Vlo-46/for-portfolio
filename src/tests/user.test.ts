import request from 'supertest';
import app from '../index';
import {generateToken} from "../helpers/jwt";

describe('User Routes', () => {
    let userId: string;
    let authToken: string;

    beforeAll(() => {
        authToken = generateToken({userId: 'user_id', email: 'user@example.com'});
    });

    afterAll(async () => {
        await (request as any)(app)
          .delete(`/api/users/${userId}`)
          .set('Authorization', `Bearer ${authToken}`);
    })

    it('should create a new user', async () => {
        const response = await (request as any)(app)
          .post('/api/users')
          .send({username: "test", email: 'user@example.com', password: '123456'});
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        userId = response.body._id;
    });

    it('should fetch all users', async () => {
        const response = await (request as any)(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should fetch a user by ID', async () => {
        const response = await (request as any)(app).get(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(userId);
    });

    it('should update a user', async () => {
        const response = await (request as any)(app)
          .put(`/api/users/${userId}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({email: 'new user'});
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(userId);
        expect(response.body.email).toBe('new user');
    });

    it('should delete a user', async () => {
        const response = await (request as any)(app)
          .delete(`/api/users/${userId}`)
          .set('Authorization', `Bearer ${authToken}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(userId);
    });
});