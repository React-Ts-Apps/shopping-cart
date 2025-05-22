const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

describe('GET /items', () => {
    it('Should return all items with status 200', async () => {
        const response = await request(app).get('/items')
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})