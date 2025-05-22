const request = require('supertest')
const app = require('../app')

describe('GET /items', () => {
    it('Should return all items with status 200', async () => {
        const response = await request(app).get('/items')
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeGreaterThan(0)

        //check for first property
        expect(response.body[0]).toHaveProperty('id')
        expect(response.body[0]).toHaveProperty('name')
        expect(response.body[0]).toHaveProperty('description')
        expect(response.body[0]).toHaveProperty('price')
        expect(response.body[0]).toHaveProperty('imgSrc')
    })
})